from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Department, Subject, Student, Schedule, Exam, Todo

# ==========================================
# 1. المترجمين الأساسيين
# ==========================================
class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'

# ==========================================
# مترجم عرض الطلاب (للإدارة والـ ViewSets)
# ==========================================
class StudentSerializer(serializers.ModelSerializer):
    # حقل إضافي عشان يعرض الترم ككلمة عربي بدل رقم
    semester_name = serializers.CharField(source='get_semester_display', read_only=True)
    
    class Meta:
        model = Student
        fields = '__all__'
        depth = 1  # عشان يجيب بيانات القسم كاملة لو الأدمن بيستعرض الطلاب

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        exclude = ['student'] # بنستبعد الطالب لأننا كده كده جوه بروفايل الطالب
        depth = 1 # عشان يرجع بيانات المادة لو مربوطة بالجدول

class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        exclude = ['student']
        depth = 1

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        exclude = ['student']

# ==========================================
# 2. مترجم الـ /me (الوحش اللي هيلم كل حاجة) 🐉
# ==========================================
class StudentMeSerializer(serializers.ModelSerializer):
    # السحر هنا: بننادي على المترجمين اللي فوق عشان يعرضوا الداتا المربوطة بالطالب
    # الأسماء دي (my_schedules الخ) هي نفس الـ related_name اللي في الـ models
    my_schedules = ScheduleSerializer(many=True, read_only=True)
    my_exams = ExamSerializer(many=True, read_only=True)
    my_todos = TodoSerializer(many=True, read_only=True)
    
    # المواد اللي الطالب مسجلها
    subjects = SubjectSerializer(many=True, read_only=True)
    
    class Meta:
        model = Student
        # بنحدد الحقول اللي هترجع، ومفيش أي أثر للباسورد هنا
        fields = [
            'student_id', 'full_name', 'department', 'semester', 
            'academic_year', 'current_cgpa', 'total_credits', 'cover_image',
            'subjects', 'my_schedules', 'my_exams', 'my_todos'
        ]
        depth = 1 # عشان يجيب بيانات القسم كاملة

# ==========================================
# 3. مترجم التسجيل (Register)
# ==========================================
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    email = serializers.EmailField(required=True)
    full_name = serializers.CharField(max_length=255, required=True)
    
    # القسم إجباري وبياخد ID موجود بس
    department = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all(), 
        required=True
    )
    semester = serializers.ChoiceField(choices=[('1','1'), ('2','2')], required=True)
    cover_image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'full_name', 'department', 'semester', 'cover_image']

    def create(self, validated_data):
        full_name = validated_data.pop('full_name')
        department = validated_data.pop('department')
        semester = validated_data.pop('semester')
        cover_image = validated_data.pop('cover_image', None)

        # 1. إنشاء حساب المستخدم (User)
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )

        # 2. إنشاء بروفايل الطالب
        student = Student.objects.create(
            user=user, 
            full_name=full_name, 
            department=department,
            semester=semester,
            cover_image=cover_image
        )

        # ==========================================
        # 3. الإضافة الأوتوماتيكية للمواد (اللوجيك الجديد)
        # ==========================================
        # بنبحث في بنك المواد عن المواد اللي تبع القسم ده والترم ده
        auto_subjects = Subject.objects.filter(
            departments=department, # المادة مربوطة بالقسم اللي الطالب اختاره
            semester=semester       # المادة بتنزل في الترم اللي الطالب اختاره
        )

        # لو لقينا مواد مطابقة، بنضيفها فوراً لملف الطالب
        if auto_subjects.exists():
            student.subjects.set(auto_subjects) 
            # استخدمنا set عشان نربط الـ ManyToMany

        return user
    
# ضيف المترجم ده في ملف serializers.py
class StudentUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        # الحقول المسموح للطالب يغيرها بنفسه
        fields = [
            'full_name', 'department', 'semester', 
            'academic_year', 'cover_image', 'subjects'
        ]
        
    def update(self, instance, validated_data):
        # اللوجيك بتاع المواد (ManyToMany)
        # لو الطالب بعت لستة IDs جديدة للمواد، جانجو هيمسح القديم ويحط الجديد أوتوماتيك
        subjects_data = validated_data.pop('subjects', None)
        if subjects_data is not None:
            instance.subjects.set(subjects_data)
        
        # تعديل باقي الحقول النصية أو الصور
        return super().update(instance, validated_data)

class ChangePasswordSerializer(serializers.Serializer):
    # الحقول اللي هنطلبها من الفرونت اند
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True, min_length=8)

    # دالة التفتيش المخصوصة للباسورد القديم
    def validate_old_password(self, value):
        # بنجيب اليوزر اللي باعت الطلب
        user = self.context['request'].user
        
        # بنخلي جانجو يتأكد إن الباسورد القديم اللي مبعوت مطابق للي في الداتابيز
        if not user.check_password(value):
            raise serializers.ValidationError("كلمة المرور القديمة غير صحيحة!")
        
        return value

    # دالة الحفظ والتشفير
    def save(self, **kwargs):
        # بنجيب اليوزر ونحدث الباسورد بتاعه
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user