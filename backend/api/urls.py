from django.urls import path, include
from rest_framework.routers import DefaultRouter

# استدعاء كل الـ Views اللي عملناها في ملف views.py
from .views import (
    # ViewSets (للإدارة وبنك الداتا)
    DepartmentViewSet, StudentViewSet, SubjectViewSet, 
    ScheduleViewSet, ExamViewSet, TodoViewSet,
    
    # Views (للطالب والتسجيل)
    RegisterView, LoginWithCookieView, LogoutView, 
    MeView, ProfileUpdateView, ChangePasswordView
)

# ==========================================
# 1. إعداد الـ Router للـ ViewSets (روابط الإدارة)
# ==========================================
router = DefaultRouter()
router.register(r'departments', DepartmentViewSet, basename='department')
router.register(r'students', StudentViewSet, basename='student')
router.register(r'subjects', SubjectViewSet, basename='subject')
router.register(r'schedules', ScheduleViewSet, basename='schedule')
router.register(r'exams', ExamViewSet, basename='exam')
router.register(r'todos', TodoViewSet, basename='todo')

# ==========================================
# 2. تجميع كل الروابط (روابط الإدارة + روابط الطالب)
# ==========================================
urlpatterns = [
    # 👈 روابط الإدارة (بتشمل كل الـ ViewSets اللي فوق)
    # هتبقى مثلا: /api/departments/ أو /api/subjects/
    path('', include(router.urls)),

    # 👈 روابط المصادقة (التسجيل والدخول)
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginWithCookieView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),

    # 👈 روابط الطالب (لوحة التحكم والتعديل)
    path('me/', MeView.as_view(), name='me'),
    path('profile/update/', ProfileUpdateView.as_view(), name='profile-update'),
    path('profile/change-password/', ChangePasswordView.as_view(), name='change-password'),
]