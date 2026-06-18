import 'package:flutter/material.dart';
import 'package:student_guide/core/theming/app_colors.dart';
import 'package:student_guide/core/theming/app_text_style.dart';
import 'package:student_guide/features/gpa_calculator/views/widgets/stat_row.dart';

class PerformanceCard extends StatelessWidget {
  final double currentGpa;
  final double lastGpa;
  final int totalCredits;
  final String strategyTip;

  const PerformanceCard({
    super.key,
    required this.currentGpa,
    required this.lastGpa,
    required this.totalCredits,
    required this.strategyTip,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final hasHistory = lastGpa > 0;
    final shift = hasHistory
        ? ((currentGpa - lastGpa) / lastGpa * 100).clamp(-100.0, 100.0)
        : 0.0;
    final isPositive = shift >= 0;
    final shiftColor = isPositive ? AppColors.success : AppColors.error;

    return Column(
      children: [
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: theme.colorScheme.surface,
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
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // shift section — only when history exists
              if (hasHistory) ...[
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Performance Shift',
                      style: AppTextStyles.heading3.copyWith(
                        color: theme.textTheme.bodyMedium?.color,
                      ),
                    ),
                    Text(
                      '${isPositive ? '+' : ''}${shift.toStringAsFixed(0)}%',
                      style: AppTextStyles.heading3.copyWith(color: shiftColor),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: LinearProgressIndicator(
                    value: (currentGpa / 4.0).clamp(0.0, 1.0),
                    backgroundColor: theme.dividerTheme.color ?? AppColors.divider,
                    valueColor: AlwaysStoppedAnimation<Color>(shiftColor),
                    minHeight: 8,
                  ),
                ),
                const SizedBox(height: 10),
                Text(
                  'Your projected GPA is ${isPositive ? 'higher' : 'lower'} than last semester\'s ${lastGpa.toStringAsFixed(2)} by ${(currentGpa - lastGpa).abs().toStringAsFixed(2)} points.',
                  style: AppTextStyles.bodySmall.copyWith(
                    color: theme.textTheme.bodySmall?.color,
                  ),
                ),
                Divider(height: 24, color: theme.dividerTheme.color ?? AppColors.divider),
              ],
              StatRow(
                label: 'Current CGPA',
                value: currentGpa.toStringAsFixed(2),
              ),
              const SizedBox(height: 8),
              StatRow(label: 'Total Credits Earned', value: '$totalCredits'),
            ],
          ),
        ),
        const SizedBox(height: 16),
        // Strategy tip
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: theme.colorScheme.tertiary.withValues(alpha: 0.08),
            borderRadius: BorderRadius.circular(16),
          ),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('💡', style: TextStyle(fontSize: 20)),
              const SizedBox(width: 10),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Strategy Tip',
                      style: AppTextStyles.heading3.copyWith(
                        color: theme.textTheme.bodyMedium?.color,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      strategyTip,
                      style: AppTextStyles.bodyMedium.copyWith(
                        color: theme.textTheme.bodySmall?.color,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}