from django.contrib import admin

# Register your models here.
from .models import Department, Student, Subject, Schedule, Exam, Todo

admin.site.register(Department)
admin.site.register(Student)
admin.site.register(Subject)
admin.site.register(Schedule)
admin.site.register(Exam)
admin.site.register(Todo)