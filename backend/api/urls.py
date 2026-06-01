from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    DepartmentViewSet, StudentViewSet, SubjectViewSet, 
    ScheduleViewSet, ExamViewSet, TodoViewSet,
    
    RegisterView, LoginWithCookieView, LogoutView, 
    MeView, ProfileUpdateView, ChangePasswordView, VerifyOTPView ,CohortMessageListCreateView,
    SendPasswordOTPView, ChangePasswordWithOTPView
)


router = DefaultRouter()
router.register(r'departments', DepartmentViewSet, basename='department')
router.register(r'students', StudentViewSet, basename='student')
router.register(r'subjects', SubjectViewSet, basename='subject')
router.register(r'schedules', ScheduleViewSet, basename='schedule')
router.register(r'exams', ExamViewSet, basename='exam')
router.register(r'todos', TodoViewSet, basename='todo')

urlpatterns = [

    path('', include(router.urls)),

    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginWithCookieView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),

    path('me/', MeView.as_view(), name='me'),
    path('profile/update/', ProfileUpdateView.as_view(), name='profile-update'),
    path('profile/change-password/', ChangePasswordView.as_view(), name='change-password'),

    path('verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),
    path('chats/', CohortMessageListCreateView.as_view(), name='cohort-chats'),

    path('profile/change-password/request-otp/', SendPasswordOTPView.as_view(), name='change-password-request-otp'),
    path('profile/change-password/verify-otp/', ChangePasswordWithOTPView.as_view(), name='change-password-verify-otp'),
]