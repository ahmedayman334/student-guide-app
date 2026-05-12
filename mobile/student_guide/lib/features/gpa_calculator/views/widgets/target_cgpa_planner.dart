import 'package:flutter/material.dart';
import 'package:student_guide/core/theming/app_colors.dart';
import 'package:student_guide/core/theming/app_text_style.dart';

class TargetCgpaPlanner extends StatelessWidget {
  final double currentCgpa;
  final double targetCgpa;
  final int totalCredits;
  final ValueChanged<double> onTargetChanged;

  const TargetCgpaPlanner({
    super.key,
    required this.currentCgpa,
    required this.targetCgpa,
    required this.onTargetChanged,
    required this.totalCredits,
  });

  @override
  Widget build(BuildContext context) {
    final requiredAvg =
        ((targetCgpa * (totalCredits + 7)) - (currentCgpa * totalCredits)) / 7;
    final neededAvg = requiredAvg.clamp(0.0, 4.0);

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.cardBackground,
        borderRadius: BorderRadius.circular(16),
        border: Border(left: BorderSide(color: AppColors.primary, width: 4)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.04),
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.track_changes, color: AppColors.primary, size: 20),
              const SizedBox(width: 8),
              Text(
                'Target CGPA Planner',
                style: AppTextStyles.heading3.copyWith(
                  color: AppColors.textPrimary,
                ),
              ),
            ],
          ),
          const SizedBox(height: 14),
          Text(
            'Desired Final CGPA',
            style: AppTextStyles.bodyMedium.copyWith(
              color: AppColors.textSecondary,
            ),
          ),
          const SizedBox(height: 8),
          SliderTheme(
            data: SliderTheme.of(context).copyWith(
              activeTrackColor: AppColors.primary,
              inactiveTrackColor: AppColors.divider,
              thumbColor: AppColors.primary,
              overlayColor: AppColors.primary.withValues(alpha: 0.1),
              trackHeight: 4,
            ),
            child: Slider(
              value: targetCgpa,
              min: 0.0,
              max: 4.0,
              divisions: 40,
              onChanged: onTargetChanged,
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Current: ${currentCgpa.toStringAsFixed(2)}',
                style: AppTextStyles.bodySmall.copyWith(
                  color: AppColors.textSecondary,
                ),
              ),
              Text(
                'Target: ${targetCgpa.toStringAsFixed(2)}',
                style: AppTextStyles.bodySmall.copyWith(
                  color: AppColors.textPrimary,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: AppColors.surfaceGrey,
              borderRadius: BorderRadius.circular(10),
            ),
            child: RichText(
              text: TextSpan(
                style: AppTextStyles.bodyMedium.copyWith(
                  color: AppColors.textSecondary,
                ),
                children: [
                  TextSpan(
                    text: 'SIMULATION RESULT\n',
                    style: AppTextStyles.sectionLabel.copyWith(
                      color: AppColors.textSecondary,
                    ),
                  ),
                  const TextSpan(text: 'To reach '),
                  TextSpan(
                    text: targetCgpa.toStringAsFixed(2),
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  const TextSpan(text: ', you need an average of '),
                  TextSpan(
                    text: neededAvg.toStringAsFixed(2),
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: AppColors.primary,
                    ),
                  ),
                  const TextSpan(text: ' across the next 3 semesters.'),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
