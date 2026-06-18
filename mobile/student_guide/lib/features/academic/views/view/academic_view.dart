import 'package:flutter/material.dart';
import 'package:student_guide/features/academic/models/department_model.dart';
import 'package:student_guide/features/academic/views/widgets/academic_header.dart';
import 'package:student_guide/features/academic/views/widgets/ai_recommender_card.dart';
import 'package:student_guide/features/academic/views/widgets/department_card.dart';

class AcademicView extends StatelessWidget {
  const AcademicView({super.key});

  static const List<DepartmentModel> _localDepartments = [
    DepartmentModel(
      name: 'Computer Science',
      description:
          'Software engineering, AI systems, and computational theory.',
      subjectCount: 124,
      icon: Icons.monitor_outlined,
      iconColor: Color(0xFF4B6BFB),
      iconBackground: Color(0xFFEEF0FF),
    ),
    DepartmentModel(
      name: 'Chemistry',
      description:
          'Organic, inorganic, physical, and analytical chemistry systems.',
      subjectCount: 85,
      icon: Icons.science_outlined,
      iconColor: Color(0xFF059669),
      iconBackground: Color(0xFFD1FAE5),
    ),
    DepartmentModel(
      name: 'Mathematics',
      description: 'Pure mathematics, calculus, linear algebra, and logic.',
      subjectCount: 92,
      icon: Icons.calculate_outlined,
      iconColor: Color(0xFFD97706),
      iconBackground: Color(0xFFFEF3C7),
    ),
    DepartmentModel(
      name: 'Statistics',
      description:
          'Probability, data analysis, statistical inference, and modelling.',
      subjectCount: 78,
      icon: Icons.bar_chart_outlined,
      iconColor: Color(0xFFDC2626),
      iconBackground: Color(0xFFFEE2E2),
    ),
    DepartmentModel(
      name: 'Physics',
      description:
          'Classical mechanics, electromagnetism, and quantum physics.',
      subjectCount: 110,
      icon: Icons.bolt_outlined,
      iconColor: Color(0xFF6366F1),
      iconBackground: Color(0xFFEEF2FF),
    ),
    DepartmentModel(
      name: 'Material Science',
      description:
          'Structure, properties, processing, and performance of materials.',
      subjectCount: 64,
      icon: Icons.layers_outlined,
      iconColor: Color(0xFF6B7280),
      iconBackground: Color(0xFFF3F4F6),
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // ── Header ───────────────────────────────────────
            const SizedBox(height: 4),
            AcademicHeader(),
            const SizedBox(height: 20),

            // ── Department Cards ──────────────────────────────
            ..._localDepartments.map(
              (d) => Padding(
                padding: const EdgeInsets.only(bottom: 14),
                child: DepartmentCard(department: d),
              ),
            ),
            const SizedBox(height: 6),

            // ── AI Recommender ────────────────────────────────
            const AiRecommenderCard(),
            const SizedBox(height: 10),
          ],
        ),
      ),
    );
  }
}
