import 'package:flutter/material.dart';
import 'package:hive_flutter/adapters.dart';
import 'package:student_guide/core/routing/app_router.dart';
import 'package:student_guide/core/theming/app_theme.dart';
import 'package:student_guide/features/dashboard/models/quick_task_model.dart';
import 'package:student_guide/features/gpa_calculator/models/gpa_snapshot_model.dart';
import 'package:student_guide/features/gpa_calculator/models/subject_entry_model.dart';

Future<void> main() async {
  await Hive.initFlutter();
Hive.registerAdapter(QuickTaskModelAdapter());
Hive.registerAdapter(SubjectEntryAdapter());
Hive.registerAdapter(GpaSnapshotModelAdapter());
  runApp(StudentGuideApp());
}

class StudentGuideApp extends StatelessWidget {
  const StudentGuideApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      debugShowCheckedModeBanner: false,
      routerConfig: router,
      title: 'Student Guide',
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: ThemeMode.system,
    );
  }
}
