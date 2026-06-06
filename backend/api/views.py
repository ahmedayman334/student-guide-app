from rest_framework import viewsets, generics, status, serializers,permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from drf_yasg.utils import swagger_auto_schema
from rest_framework.generics import GenericAPIView
from .models import Department, Student, Subject, Schedule, Exam, Todo ,CohortMessage
from .serializers import (
    DepartmentSerializer, StudentSerializer, SubjectSerializer, 
    ScheduleSerializer, ExamSerializer, TodoSerializer,
    RegisterSerializer, StudentMeSerializer, 
    StudentUpdateSerializer, ChangePasswordSerializer,VerifyOTPSerializer, 
    CohortMessageSerializer ,ChangePasswordWithOTPSerializer
)
from rest_framework import generics
import random
from django.conf import settings
from django.core.mail import send_mail
from .permissions import IsLeaderForCohortOrReadOnly
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth import logout

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class ScheduleViewSet(viewsets.ModelViewSet):
    serializer_class = ScheduleSerializer
    permission_classes = [IsLeaderForCohortOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        
        if not user.is_authenticated:
            return Schedule.objects.none()
            
        try:
            profile = user.student_profile
            return Schedule.objects.filter(
                target_level=profile.current_level,
                department=profile.department
            )
        except Exception:
            return Schedule.objects.none()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)



class ExamViewSet(viewsets.ModelViewSet):
    serializer_class = ExamSerializer
    permission_classes = [IsLeaderForCohortOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        
        if not user.is_authenticated:
            return Exam.objects.none()
            
        try:
            profile = user.student_profile
            return Exam.objects.filter(
                target_level=profile.current_level,
                department=profile.department
            )
        except Exception:
            return Exam.objects.none()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated] 

    def get_queryset(self):
        return Todo.objects.filter(student=self.request.user.student_profile)

    def perform_create(self, serializer):
        serializer.save(student=self.request.user.student_profile)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save() 


        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        student_data = StudentMeSerializer(user.student_profile).data

        response = Response({
            "message": "Account Created And Login Successfully",
            "student": student_data
        }, status=status.HTTP_201_CREATED)

        response.set_cookie(
            key='access_token', 
            value=access_token, 
            httponly=True, 
            samesite='Lax', 
            max_age=3600
        )
        response.set_cookie(
            key='refresh_token', 
            value=refresh_token, 
            httponly=True, 
            samesite='Lax', 
            max_age=86400
        )
        return response

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'})

class LoginWithCookieView(APIView):
    permission_classes = (AllowAny,)

    @swagger_auto_schema(request_body=LoginSerializer)
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            student_data = StudentMeSerializer(user.student_profile).data

            response = Response({
                "message": "Login Successfully!",
                "student": student_data
            }, status=status.HTTP_200_OK)

            response.set_cookie(key='access_token', value=access_token, httponly=True, samesite='Lax', max_age=3600)
            response.set_cookie(key='refresh_token', value=refresh_token, httponly=True, samesite='Lax', max_age=86400)
            return response
        else:
            return Response({"error": "Incorrect Username or Password"}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    # لازم يكون مسجل دخول أصلاً عشان يعمل لوج أوت
    permission_classes = [IsAuthenticated] 

    def post(self, request):
        # 1. لو بتستخدم Token Authentication العادي بتاع جانجو (بيمسح التوكن من الداتابيز)
        if hasattr(request.user, 'auth_token'):
            request.user.auth_token.delete()
            
        # 2. لو بتستخدم Session Authentication (وده اللي Swagger بيستخدمه في الكواليس)
        logout(request)
        
        return Response({"message": "Logout Successfully!"}, status=status.HTTP_200_OK)

class MeView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        student = request.user.student_profile
        serializer = StudentMeSerializer(student)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ProfileUpdateView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StudentUpdateSerializer

    parser_classes = [MultiPartParser, FormParser]
    def get_object(self):
        return self.request.user.student_profile

class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(request_body=ChangePasswordSerializer)
    def put(self, request):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Your password have been changed successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyOTPView(GenericAPIView):
    permission_classes = [] 
    
    serializer_class = VerifyOTPSerializer 

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data) 
        
        if serializer.is_valid():
            email = serializer.validated_data['email']
            otp_code = serializer.validated_data['otp_code']
            
            try:
                user = User.objects.get(email=email)
                student_profile = user.student_profile
                
                if student_profile.otp_code == otp_code:
                    user.is_active = True 
                    user.save()
                    
                    student_profile.otp_code = None
                    student_profile.save()
                    
                    return Response({"message": "Account activated successfully!"}, status=status.HTTP_200_OK)
                else:
                    return Response({"error": "Invalid activation code."}, status=status.HTTP_400_BAD_REQUEST)
                    
            except User.DoesNotExist:
                return Response({"error": "User with this email does not exist."}, status=status.HTTP_404_NOT_FOUND)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class IsLeaderToChat(permissions.BasePermission):
    message = "You do not have permission to perform this action."

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
            
        if not request.user or not request.user.is_authenticated:
            self.message = "Authentication required. You must be logged in."
            return False
            
        if not hasattr(request.user, 'student_profile'):
            self.message = "This account does not have a student profile (you might be using a Superuser account)."
            return False
            
        if request.user.student_profile.role != 'leader':
            self.message = f"Access denied! Your account is registered as '{request.user.student_profile.role}', not a leader."
            return False
            
        return True

class CohortMessageListCreateView(generics.ListCreateAPIView):
    serializer_class = CohortMessageSerializer
    permission_classes = [permissions.IsAuthenticated, IsLeaderToChat]

    def get_queryset(self):
        profile = self.request.user.student_profile
        
        return CohortMessage.objects.filter(
            department=profile.department,
            target_level=profile.current_level
        )

# 1. مسار إرسال الـ OTP للإيميل المربوط أوتوماتيك (مبياخدش أي بيانات في الـ Body)
class SendPasswordOTPView(APIView):
    permission_classes = [permissions.IsAuthenticated] # 👈 محمي

    def post(self, request):
        user = request.user
        student = user.student_profile
        
        # لقطنا الإيميل المربوط بالحساب علطول
        email = user.email 
        
        if not email:
            return Response({"error": "This account does not have a linked email."}, status=status.HTTP_400_BAD_REQUEST)

        # توليد OTP جديد وحفظه
        otp = str(random.randint(100000, 999999))
        student.otp_code = otp
        student.save()
        
        try:
            send_mail(
                # print("=========================================")
                # print(f"Attempting to send OTP to: '{email}'")
                # print("=========================================")
                subject='Verification Code to Change Password',
                message=f'Hello {student.full_name},\n\nYour verification code to set a new password is: {otp}\n\nIf you did not request this, please secure your account.',
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[email],
                fail_silently=False,
            )
            return Response({"message": "Verification OTP sent to your linked email successfully."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": f"Failed to send email: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ChangePasswordWithOTPView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    
    # 👈 السطر السحري ده اللي هيخلي Swagger يرسم المربعات!
    serializer_class = ChangePasswordWithOTPSerializer 

    def post(self, request, *args, **kwargs):
        # 👈 غيرنا دي عشان تقرأ السيريلايزر صح
        serializer = self.get_serializer(data=request.data) 
        
        if serializer.is_valid():
            otp_code = serializer.validated_data['otp_code']
            new_password = serializer.validated_data['new_password']
            
            user = request.user
            student = user.student_profile
            
            # التأكد من الـ OTP
            if student.otp_code == otp_code:
                user.set_password(new_password)
                user.save()
                
                # تنظيف الكود
                student.otp_code = None
                student.save()
                
                return Response({"message": "Your password has been changed successfully!"}, status=status.HTTP_200_OK)
            else:
                return Response({"otp_code": "Invalid or expired OTP code!"}, status=status.HTTP_400_BAD_REQUEST)
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

18475823