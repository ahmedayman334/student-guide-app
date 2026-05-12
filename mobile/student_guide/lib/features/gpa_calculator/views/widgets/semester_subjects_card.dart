import 'package:flutter/material.dart';
import 'package:student_guide/core/theming/app_colors.dart';
import 'package:student_guide/core/theming/app_text_style.dart';
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
        color: AppColors.cardBackground,
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
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Semester\nSubjects',
                style: AppTextStyles.heading2
                    .copyWith(color: AppColors.textPrimary),
              ),
              ElevatedButton.icon(
                onPressed: onAdd,
                icon: const Icon(Icons.add, size: 16, color: Colors.white),
                label: Text('Add Subject',
                    style: AppTextStyles.buttonSecondary
                        .copyWith(color: Colors.white)),
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primary,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                  padding: const EdgeInsets.symmetric(
                      horizontal: 14, vertical: 10),
                  elevation: 0,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
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