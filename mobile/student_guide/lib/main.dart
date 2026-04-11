import 'package:flutter/material.dart';
import 'package:student_guide/core/routing/app_router.dart';
import 'package:student_guide/core/theming/app_theme.dart';

void main() {
  runApp(StudentGuideApp());
}

class StudentGuideApp extends StatelessWidget {
  const StudentGuideApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: router,
      title: 'Student Guide',
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: ThemeMode.system,
    );
  }
}
