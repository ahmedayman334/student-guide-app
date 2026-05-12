import 'package:flutter/material.dart';
import 'package:student_guide/core/theming/app_colors.dart';
import 'package:student_guide/core/theming/app_text_style.dart';

class EstimatedGpaCard extends StatelessWidget {
  final double gpa;

  const EstimatedGpaCard({super.key, required this.gpa});

  String get _level {
    if (gpa >= 3.7) return 'Distinction Level';
    if (gpa >= 3.0) return 'Good Standing';
    if (gpa >= 2.0) return 'Satisfactory';
    return 'Needs Improvement';
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(vertical: 28, horizontal: 20),
      decoration: BoxDecoration(
        color: AppColors.primary,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        children: [
          Text('ESTIMATED GPA',
              style: AppTextStyles.sectionLabel
                  .copyWith(color: Colors.white70)),
          const SizedBox(height: 8),
          Text(gpa.toStringAsFixed(2),
              style: AppTextStyles.statNumber.copyWith(
                  fontSize: 56, color: Colors.white)),
          const SizedBox(height: 8),
          Container(
            padding:
                const EdgeInsets.symmetric(horizontal: 14, vertical: 5),
            decoration: BoxDecoration(
              color: Colors.white.withValues(alpha: 0.2),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Text(_level,
                style: AppTextStyles.heading3
                    .copyWith(color: Colors.white)),
          ),
          const SizedBox(height: 12),
          Text(
            'Based on ${gpa > 0 ? "current credits" : "no credits"} and selected grade projections.',
            textAlign: TextAlign.center,
            style:
                AppTextStyles.bodySmall.copyWith(color: Colors.white70),
          ),
        ],
      ),
    );
  }
}