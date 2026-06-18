// lib/features/profile/views/widgets/academic_status_card.dart
import 'package:flutter/material.dart';
import 'package:student_guide/core/theming/app_text_style.dart';

import '../../../../core/theming/app_colors.dart';

class AcademicStatusCard extends StatelessWidget {
  final double gpa;
  final int creditsEarned;
  final int totalCredits;

  const AcademicStatusCard({
    super.key,
    required this.gpa,
    required this.creditsEarned,
    required this.totalCredits,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.surface,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(color: Colors.black.withValues(alpha: 0.05), blurRadius: 8),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.shield, color: Theme.of(context).colorScheme.primary, size: 18),
              const SizedBox(width: 6),
              Text(
                'Academic Status',
                style: AppTextStyles.heading3.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          _StatusRow(
            label: 'Current GPA',
            value: gpa.toStringAsFixed(2),
            highlighted: false,
          ),
          const SizedBox(height: 8),
          _StatusRow(
            label: 'Credits Earned',
            value: '$creditsEarned / $totalCredits',
            highlighted: true,
          ),
        ],
      ),
    );
  }
}

class _StatusRow extends StatelessWidget {
  final String label;
  final String value;
  final bool highlighted;

  const _StatusRow({
    required this.label,
    required this.value,
    required this.highlighted,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 12),
      decoration: BoxDecoration(
        color: highlighted
            ? (isDark
                ? theme.colorScheme.tertiary.withValues(alpha: 0.15)
                : const Color(0xFFFFF8E7))
            : (isDark
                ? AppColors.darkSurfaceGrey
                : Colors.grey.shade50),
        borderRadius: BorderRadius.circular(8),
        border: highlighted
            ? Border(left: BorderSide(color: theme.colorScheme.tertiary, width: 3))
            : null,
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: AppTextStyles.bodyMedium.copyWith(color: theme.textTheme.bodyMedium?.color)),
          Text(
            value,
            style: AppTextStyles.bodyMedium.copyWith(
              fontWeight: FontWeight.w600,
              color: theme.textTheme.bodyMedium?.color,
            ),
          ),
        ],
      ),
    );
  }
}
