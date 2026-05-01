from rest_framework import viewsets, generics, status, serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from drf_yasg.utils import swagger_auto_schema

# 1. استدعاء الموديلز
from .models import Department, Student, Subject, Schedule, Exam, Todo

# 2. استدعاء كل المترجمين (القديم والجديد)
from .serializers import (
    DepartmentSerializer, StudentSerializer, SubjectSerializer, 
    ScheduleSerializer, ExamSerializer, TodoSerializer,
    RegisterSerializer, StudentMeSerializer, 
    StudentUpdateSerializer, ChangePasswordSerializer
)

# ==========================================
# الجزء الأول: الـ ViewSets (للإدارة وبنك الداتا)
# ==========================================
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
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer

class ExamViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


# ==========================================
# الجزء الثاني: إنشاء حساب وتسجيل الدخول (محدثة)
# ==========================================

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    # بنتدخل هنا عشان نتحكم في اللي بيحصل بعد ما الداتا تكون سليمة
    def create(self, request, *args, **kwargs):
        # 1. التفتيش العادي وإنشاء الحساب (بالمواد الأوتوماتيك زي ما ظبطناها في الـ Serializer)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save() # الدالة دي بترجعلك اليوزر اللي لسه متكريت

        # ==========================================
        # 2. بداية سحر الـ Auto-Login ✨
        # ==========================================
        # توليد الـ Tokens لليوزر الجديد
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        # سحب بيانات بروفايل الطالب كاملة بالمواد اللي نزلتله
        student_data = StudentMeSerializer(user.student_profile).data

        # تجهيز الرد للفرونت اند (بدل الرد الافتراضي الفاضي)
        response = Response({
            "message": "Account Created And Login Successfully",
            "student": student_data
        }, status=status.HTTP_201_CREATED)

        # حشر الـ Tokens في الـ Cookies
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

            # التحديث هنا: بنرجع داتا الطالب كلها بدل الـ username بس
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
    permission_classes = (AllowAny,)

    def post(self, request):
        response = Response({"message": "Login Successfully!"}, status=status.HTTP_200_OK)
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        return response


# ==========================================
# الجزء الثالث: العمليات الخاصة بالطالب الحالي (الجديد)
# ==========================================
class MeView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        student = request.user.student_profile
        serializer = StudentMeSerializer(student)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ProfileUpdateView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StudentUpdateSerializer
    def get_object(self):
        return self.request.user.student_profile

class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(request_body=ChangePasswordSerializer)
    def put(self, request):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Your password has been changed successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)