// lib/features/gpa_calculator/views/widgets/semester_subjects_card.dart

import 'package:flutter/material.dart';
import 'package:student_guide/core/theming/app_colors.dart';
import 'package:student_guide/features/gpa_calculator/models/subject_entry_model.dart';
import 'package:student_guide/features/gpa_calculator/views/widgets/subject_row.dart';

class SemesterSubjectsCard extends StatelessWidget {
  final List<SubjectEntry> subjects;
  final VoidCallback onAdd;
  final VoidCallback onChanged;
  final void Function(int) onDelete;

  const SemesterSubjectsCard({
    super.key,
    required this.subjects,
    required this.onAdd,
    required this.onChanged,
    required this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.04),
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        children: [
          // ── Header ──────────────────────────────────────
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'Semester\nSubjects',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF1A1A2E),
                  height: 1.3,
                ),
              ),
              ElevatedButton.icon(
                onPressed: onAdd,
                icon: const Icon(Icons.add, size: 16, color: Colors.white),
                label: const Text(
                  'Add Subject',
                  style: TextStyle(fontSize: 13, color: Colors.white),
                ),
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primary,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                  padding: const EdgeInsets.symmetric(
                    horizontal: 14,
                    vertical: 10,
                  ),
                  elevation: 0,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),

          // ── Subject Rows ─────────────────────────────────
          ...subjects.asMap().entries.map(
            (e) => SubjectRow(
              entry: e.value,
              onDelete: () => onDelete(e.key),
              onChanged: onChanged,
            ),
          ),
        ],
      ),
    );
  }
}
