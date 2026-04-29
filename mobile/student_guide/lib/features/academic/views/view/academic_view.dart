import 'package:flutter/material.dart';
import 'package:student_guide/features/academic/models/department_model.dart';
import 'package:student_guide/features/academic/views/widgets/academic_header.dart';
import 'package:student_guide/features/academic/views/widgets/ai_recommender_card.dart';
import 'package:student_guide/features/academic/views/widgets/department_card.dart';

class AcademicView extends StatelessWidget {
  const AcademicView({super.key});
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
            ...departments.map(
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
