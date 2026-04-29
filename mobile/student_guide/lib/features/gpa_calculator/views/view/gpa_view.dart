// lib/features/gpa_calculator/views/view/gpa_calculator_view.dart

import 'package:flutter/material.dart';
import 'package:student_guide/core/theming/app_colors.dart';
import 'package:student_guide/features/gpa_calculator/models/subject_entry_model.dart';
import 'package:student_guide/features/gpa_calculator/views/widgets/estimated_gpa_card.dart';
import 'package:student_guide/features/gpa_calculator/views/widgets/performance_card.dart';
import 'package:student_guide/features/gpa_calculator/views/widgets/semester_subjects_card.dart';
import 'package:student_guide/features/gpa_calculator/views/widgets/target_cgpa_planner.dart';

class GpaCalculatorView extends StatefulWidget {
  const GpaCalculatorView({super.key});

  @override
  State<GpaCalculatorView> createState() => _GpaCalculatorViewState();
}

class _GpaCalculatorViewState extends State<GpaCalculatorView> {
  double _targetCgpa = 3.85;

  final List<SubjectEntry> _subjects = [
    SubjectEntry(name: 'Advanced Microeconomics', credits: 4, grade: 3.7),
    SubjectEntry(name: 'Data Structures & Algorithms', credits: 3, grade: 4.0),
    SubjectEntry(),
  ];

  static const double _currentCgpa = 3.62;
  static const double _lastGpa = 3.41;
  static const int _totalCredits = 84;

  double get _estimatedGpa {
    double totalPoints = 0;
    int totalCredits = 0;
    for (final s in _subjects) {
      if (s.grade != null && s.credits > 0) {
        totalPoints += s.grade! * s.credits;
        totalCredits += s.credits;
      }
    }
    if (totalCredits == 0) return 0.0;
    return totalPoints / totalCredits;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // ── Header ─────────────────────────────────────
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: const Color(0xFFEEF0FF),
                borderRadius: BorderRadius.circular(6),
              ),
              child: Text(
                'ACADEMIC TOOL',
                style: TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w600,
                  color: AppColors.primary,
                  letterSpacing: 1.2,
                ),
              ),
            ),
            const SizedBox(height: 8),
            const Text(
              'GPA Strategy',
              style: TextStyle(
                fontSize: 28,
                fontWeight: FontWeight.bold,
                color: Color(0xFF1A1A2E),
              ),
            ),
            const SizedBox(height: 4),
            const Text(
              'Simulate your semester outcomes and plan your path to academic excellence with precision.',
              style: TextStyle(fontSize: 13, color: Color(0xFF6B7280), height: 1.5),
            ),
            const SizedBox(height: 20),

            // ── Semester Subjects ───────────────────────────
            SemesterSubjectsCard(
              subjects: _subjects,
              onAdd: () => setState(() => _subjects.add(SubjectEntry())),
              onChanged: () => setState(() {}),
              onDelete: (i) => setState(() => _subjects.removeAt(i)),
            ),
            const SizedBox(height: 16),

            // ── Target CGPA Planner ─────────────────────────
            TargetCgpaPlanner(
              currentCgpa: _currentCgpa,
              targetCgpa: _targetCgpa,
              onTargetChanged: (val) => setState(() => _targetCgpa = val),
            ),
            const SizedBox(height: 16),

            // ── Estimated GPA ───────────────────────────────
            EstimatedGpaCard(gpa: _estimatedGpa),
            const SizedBox(height: 16),

            // ── Performance + Strategy ──────────────────────
            PerformanceCard(
              currentGpa: _estimatedGpa > 0 ? _estimatedGpa : _currentCgpa,
              lastGpa: _lastGpa,
              totalCredits: _totalCredits,
              strategyTip:
                  "Focus on 'Data Structures' (4 credits). Increasing that grade to A+ would boost your CGPA by an additional 0.03.",
            ),
            const SizedBox(height: 80),
          ],
        ),
      ),
    );
  }
}