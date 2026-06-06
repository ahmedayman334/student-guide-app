from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Department, Subject, Student, Schedule, Exam, Todo ,CohortMessage
from django.utils import timezone
import random
import re
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.validators import UniqueValidator

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'



class StudentSerializer(serializers.ModelSerializer):
    current_level = serializers.ReadOnlyField() 

    class Meta:
        model = Student
        fields = ['student_id', 'full_name', 'department','current_level', 'role', 'virtual_start_year', 'cover_image', 'current_cgpa', 'total_credits']


class SubjectMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['subject_id', 'subject_code', 'name', 'credits']


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'
        read_only_fields = ['created_by']
        
    def validate(self, data):
        if not data.get('subject'):
            raise serializers.ValidationError({"subject": "You must select a subject to add to the schedule."})
            
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            profile = request.user.student_profile
            
            if data.get('target_level') != profile.current_level:
                raise serializers.ValidationError({
                    "target_level":  f"Access denied! You are a leader for level {profile.current_level} only, and you cannot add to level {data.get('target_level')}."
                })
                
            if data.get('department') and data.get('department') != profile.department:
                raise serializers.ValidationError({
                    "department":  "Access denied! You cannot add to a department other than your own."
                })
        return data

    def to_representation(self, instance):
        response = super().to_representation(instance)
        if instance.subject:
            response['subject'] = SubjectMiniSerializer(instance.subject).data
        return response

class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = '__all__'
        read_only_fields = ['created_by']

    def validate(self, data):
        if not data.get('subject'):
            raise serializers.ValidationError({"subject": "You must select a subject for this exam."})
            
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            profile = request.user.student_profile
            
            if data.get('target_level') and data.get('target_level') != profile.current_level:
                raise serializers.ValidationError({
                    "target_level":  f"Access denied! You are a leader for level {profile.current_level} only, and you cannot add an exam for level {data.get('target_level')}."
                })
                
            if data.get('department') and data.get('department') != profile.department:
                raise serializers.ValidationError({
                    "department": "Access denied! You cannot add an exam to a department other than your own."
                })
                
        return data

    def to_representation(self, instance):
        response = super().to_representation(instance)
        if instance.subject:
            response['subject'] = SubjectMiniSerializer(instance.subject).data
        return response


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        exclude = ['student']


class StudentMeSerializer(serializers.ModelSerializer):
    my_todos = TodoSerializer(many=True, read_only=True)
    subjects = SubjectSerializer(many=True, read_only=True)
    current_level = serializers.ReadOnlyField()
    
    class Meta:
        model = Student
        fields = [
            'student_id', 'full_name', 'department', 'role',
            'current_level', 'current_cgpa', 'total_credits', 'cover_image',
            'subjects', 'my_todos'
        ]
        depth = 1

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(
            queryset=User.objects.all(), 
            message="This email is already registered."
        )]
    )
    
    full_name = serializers.CharField(max_length=255, required=True)
    department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all(), required=True)
    
    current_level = serializers.IntegerField(write_only=True, required=True, min_value=1, max_value=5)
    cover_image = serializers.ImageField(required=False, allow_null=True)
    invite_code = serializers.CharField(write_only=True, required=False, allow_blank=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'full_name', 'department', 'current_level', 'cover_image', 'invite_code']

    def validate_password(self, value):
        if not re.search(r'\d', value):
            raise serializers.ValidationError("Password must contain at least one number.")
        if not re.search(r'[a-zA-Z]', value):
            raise serializers.ValidationError("Password must contain at least one letter.")
        return value

    def create(self, validated_data):
        full_name = validated_data.pop('full_name')
        department = validated_data.pop('department')
        input_level = validated_data.pop('current_level')
        cover_image = validated_data.pop('cover_image', None)
        invite_code = validated_data.pop('invite_code', None)

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        
        user.is_active = False 
        user.save()

        assigned_role = 'leader' if invite_code == 'LEADER_SECRET_2026' else 'student'
        otp = str(random.randint(100000, 999999))

        from django.utils import timezone
        current_date = timezone.now().date()
        if current_date.month < 9:
            current_academic_year = current_date.year - 1
        else:
            current_academic_year = current_date.year
            
        calculated_start_year = current_academic_year - input_level + 1

        student = Student.objects.create(
            user=user, 
            full_name=full_name, 
            department=department,
            virtual_start_year=calculated_start_year, 
            role=assigned_role,
            cover_image=cover_image,
            otp_code=otp 
        )

        try:
            send_mail(
                subject='Your Account Activation Code - Student Guide',
                message=f'Hello {full_name},\n\nYour activation code is: {otp}\n\nPlease enter this code in the app to activate your account successfully.',
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[validated_data['email']],
                fail_silently=False,
            )
        except Exception as e:
            print(f"Error sending email: {e}")
        return user

class StudentUpdateSerializer(serializers.ModelSerializer):
    current_level = serializers.IntegerField(required=False, min_value=1, max_value=5)
    
    class Meta:
        model = Student
        fields = [
            'full_name', 
            'department', 
            'cover_image', 
            'current_level', 
            'current_cgpa', 
            'total_credits',
        ]
        extra_kwargs = {
            'full_name': {'required': False},
            'department': {'required': False},
        }
        
    def update(self, instance, validated_data):
        if 'current_level' in validated_data:
            new_level = validated_data.pop('current_level')
            
            from django.utils import timezone
            current_date = timezone.now().date()
            if current_date.month < 9:
                current_academic_year = current_date.year - 1
            else:
                current_academic_year = current_date.year
                
            instance.virtual_start_year = current_academic_year - new_level + 1
            
        return super().update(instance, validated_data)


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True, min_length=8)

    def validate_old_password(self, value):
        user = self.context['request'].user
        
        if not user.check_password(value):
            raise serializers.ValidationError("Incorrect old password!")
        
        return value

    def save(self, **kwargs):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user
    
class VerifyOTPSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    otp_code = serializers.CharField(max_length=6, required=True)

class CohortMessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source='sender.student_profile.full_name', read_only=True)
    
    class Meta:
        model = CohortMessage
        fields = ['message_id', 'sender_name', 'department', 'target_level', 'content', 'created_at']
        read_only_fields = ['department', 'target_level', 'created_at']

    def create(self, validated_data):
        request = self.context.get('request')
        profile = request.user.student_profile
        validated_data['sender'] = request.user
        validated_data['department'] = profile.department
        validated_data['target_level'] = profile.current_level
        
        return super().create(validated_data)
    

class ChangePasswordWithOTPSerializer(serializers.Serializer):
    otp_code = serializers.CharField(max_length=6, required=True)
    new_password = serializers.CharField(required=True, min_length=8, write_only=True)

    def validate_new_password(self, value):
        if not re.search(r'\d', value):
            raise serializers.ValidationError("Password must contain at least one number.")
        if not re.search(r'[a-zA-Z]', value):
            raise serializers.ValidationError("Password must contain at least one letter.")
        return value