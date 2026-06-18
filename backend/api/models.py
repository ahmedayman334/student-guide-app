from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import random
import string

def generate_custom_id():
    return ''.join(random.choices(string.digits, k=8))

class Department(models.Model):
    department_id = models.CharField(max_length=8, primary_key=True, default=generate_custom_id, editable=False)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Subject(models.Model):
    subject_id = models.CharField(max_length=8, primary_key=True, default=generate_custom_id, editable=False)
    subject_code = models.CharField(max_length=20, unique=True, help_text="e.g., CS101")
    name = models.CharField(max_length=255)
    credits = models.IntegerField()
    
    departments = models.ManyToManyField(Department, related_name='subjects')

    def __str__(self):
        return f"{self.subject_code} - {self.name}"
class Student(models.Model):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('leader', 'Leader'),
    )

    student_id = models.CharField(max_length=8, primary_key=True, default=generate_custom_id, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile')
    full_name = models.CharField(max_length=255)
    
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='student', help_text="Determines if the user can manage schedules.")
    virtual_start_year = models.IntegerField(null=True, blank=True, help_text="Calculated base year used to dynamically determine the student's current level.")
    
    subjects = models.ManyToManyField(Subject, related_name='enrolled_students', blank=True)
    cover_image = models.ImageField(upload_to='student_covers/', blank=True, null=True)
    current_cgpa = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    total_credits = models.IntegerField(default=0)
    otp_code = models.CharField(max_length=6, null=True, blank=True)
    
    @property
    def current_level(self):
        """
        Dynamically calculates the current academic level.
        Academic year rolls over on September 1st.
        """
        if not self.virtual_start_year:
            return 
            
        from django.utils import timezone
        current_date = timezone.now().date()
        
        
        if current_date.month < 9:
            current_academic_year = current_date.year - 1
        else:
            current_academic_year = current_date.year
            
        
        level = current_academic_year - self.virtual_start_year + 1
        
        
        return max(1, min(level, 5))
    def __str__(self):
        return f"{self.full_name} ({self.role.capitalize()})"

class Schedule(models.Model):
    DAY_CHOICES = (
        ('saturday', 'Saturday'),
        ('sunday', 'Sunday'),
        ('monday', 'Monday'),
        ('tuesday', 'Tuesday'),
        ('wednesday', 'Wednesday'),
        ('thursday', 'Thursday'),
    )

    schedule_id = models.CharField(max_length=8, primary_key=True, default=generate_custom_id, editable=False)
    
    target_level = models.IntegerField(help_text="Target academic level for this schedule (e.g., 1, 2, 3, 4).")
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='department_schedules', null=True, blank=True)
    
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, null=True, blank=True)
    type = models.CharField(max_length=50, help_text="Lecture, Lab, Section, etc.")
    hall_location = models.CharField(max_length=100)
    day_of_week = models.CharField(max_length=20, choices=DAY_CHOICES)
    start_time = models.TimeField()
    end_time = models.TimeField()
    
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, help_text="The Leader who added this schedule entry.")

    def __str__(self):
        return f"Level {self.target_level} | {self.subject.name} - {self.type}"

class Exam(models.Model):
    exam_id = models.CharField(max_length=8, primary_key=True, default=generate_custom_id, editable=False)
    
    target_level = models.IntegerField(help_text="Target academic level for this exam (e.g., 1, 2, 3, 4).")
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='department_exams', null=True, blank=True)
    
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, null=True, blank=True)
    exam_date = models.DateField()
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)
    hall_location = models.CharField(max_length=100, help_text="Exam hall or location.", null=True, blank=True)
    
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, help_text="The Leader who added this exam.")

    def __str__(self):
        return f"Level {self.target_level} | {self.subject.name} Exam"

class Todo(models.Model):
    todo_id = models.CharField(max_length=8, primary_key=True, default=generate_custom_id, editable=False)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='my_todos')
    task_name = models.CharField(max_length=255)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return self.task_name

class CohortMessage(models.Model):
    message_id = models.CharField(max_length=8, primary_key=True, default=generate_custom_id, editable=False)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    department = models.ForeignKey('Department', on_delete=models.CASCADE)
    target_level = models.IntegerField()
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at'] 

    def __str__(self):
        return f"Message by {self.sender.username} to Level {self.target_level}"