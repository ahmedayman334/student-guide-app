from django.db import models
from django.contrib.auth.models import User
import random
import string

# ----------------------------------------------------------------
# دالة توليد الـ ID الفريد (8 أرقام)
# ----------------------------------------------------------------
def generate_custom_id():
    return ''.join(random.choices(string.digits, k=8))

# ==========================================
# 1. جدول الأقسام (Department)
# ==========================================
class Department(models.Model):
    department_id = models.CharField(max_length=8, primary_key=True, default=generate_custom_id, editable=False)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

# ==========================================
# 2. جدول المواد (Subject) - "بنك المواد العام"
# ==========================================
class Subject(models.Model):
    subject_id = models.CharField(max_length=8, primary_key=True, default=generate_custom_id, editable=False)
    subject_code = models.CharField(max_length=20) # 👈 كود المادة اللي طلبته (مثلاً CS101)
    name = models.CharField(max_length=255)
    credits = models.IntegerField()
    
    # المادة ممكن تتبع أكتر من قسم (Many-To-Many)
    departments = models.ManyToManyField(Department, related_name='subjects')
    
    # المادة بتظهر للطالب بناءً على الترم (1-8)
    semester = models.CharField(max_length=2, default='1')

    def __str__(self):
        return f"{self.subject_code} - {self.name}"

# ==========================================
# 3. جدول الطالب (Student) - "المخطط الشخصي"
# ==========================================
class Student(models.Model):
    student_id = models.CharField(max_length=8, primary_key=True, default=generate_custom_id, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile')
    full_name = models.CharField(max_length=255)
    
    # البيانات الأساسية لتصنيف الطالب
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)
    semester = models.CharField(max_length=2, choices=[('1','الترم الاول'), ('2','الترم الثاني')], default='1')
    academic_year = models.CharField(max_length=50, null=True, blank=True)
    
    # 👈 قائمة مواد الطالب الخاصة (بيضيف ويشيل منها من بنك المواد العام)
    subjects = models.ManyToManyField(Subject, related_name='enrolled_students', blank=True)
    
    cover_image = models.ImageField(upload_to='student_covers/', blank=True, null=True)
    current_cgpa = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    total_credits = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.full_name} ({self.student_id})"

# ==========================================
# 4. الجدول الدراسي الشخصي (Schedule)
# ==========================================
class Schedule(models.Model):
    schedule_id = models.CharField(max_length=8, primary_key=True, default=generate_custom_id, editable=False)
    
    # 👈 مربوط بالطالب مباشرة (جدوله هو بس)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='my_schedules')
    
    # المادة اختيارية عشان لو عايز يضيف حاجة بره المنهج في جدوله
    subject = models.ForeignKey(Subject, on_delete=models.SET_NULL, null=True, blank=True)
    
    type = models.CharField(max_length=50) # Lecture, Lab, Study Session...
    hall_location = models.CharField(max_length=100)
    day_of_week = models.CharField(max_length=20)
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return f"{self.student.full_name} - {self.type}"

# ==========================================
# 5. جدول الامتحانات الشخصي (Exam)
# ==========================================
class Exam(models.Model):
    exam_id = models.CharField(max_length=8, primary_key=True, default=generate_custom_id, editable=False)
    
    # 👈 مربوط بالطالب مباشرة
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='my_exams')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    
    exam_date = models.DateTimeField()

    def __str__(self):
        return f"{self.student.full_name} Exam - {self.subject.name}"

# ==========================================
# 6. جدول المهام (Todo)
# ==========================================
class Todo(models.Model):
    todo_id = models.CharField(max_length=8, primary_key=True, default=generate_custom_id, editable=False)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='my_todos')
    task_name = models.CharField(max_length=255)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return self.task_name