import 'package:flutter/material.dart';
import 'package:student_guide/core/theming/app_colors.dart';
import 'package:student_guide/core/theming/app_theme.dart';

void main() {
  runApp(StudentGuideApp());
}

class StudentGuideApp extends StatelessWidget {
  const StudentGuideApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Student Guide',
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: ThemeMode.system,
      home: Scaffold(
        body: Center(
          child: Text(
            "sydent guide app",
            style: TextStyle(color: AppColors.textPrimary),
          ),
        ),
      ),
    );
  }
}
