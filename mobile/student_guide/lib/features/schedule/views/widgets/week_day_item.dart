// lib/features/schedule/views/widgets/week_day_item.dart

import 'package:flutter/material.dart';
import 'package:student_guide/core/theming/app_colors.dart';
import 'package:student_guide/core/theming/app_text_style.dart';

class WeekDayItem extends StatelessWidget {
  final String dayName;
  final int dayNumber;
  final bool isSelected;
  final bool isWeekend;
  final VoidCallback onTap;

  const WeekDayItem({
    super.key,
    required this.dayName,
    required this.dayNumber,
    required this.isSelected,
    required this.isWeekend,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: SizedBox(
        width: 40,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              dayName,
              style: AppTextStyles.badge.copyWith(
                fontSize: 11,
                color: isSelected
                    ? AppColors.primary
                    : isWeekend
                        ? AppColors.textHint
                        : AppColors.textSecondary,
              ),
            ),
            const SizedBox(height: 6),
            Container(
              width: 36,
              height: 36,
              decoration: BoxDecoration(
                color: isSelected ? AppColors.primary : Colors.transparent,
                shape: BoxShape.circle,
              ),
              alignment: Alignment.center,
              child: Text(
                '$dayNumber',
                style: AppTextStyles.bodyMedium.copyWith(
                  color: isSelected
                      ? Colors.white
                      : isWeekend
                          ? AppColors.textHint
                          : AppColors.textPrimary,
                  fontWeight:
                      isSelected ? FontWeight.bold : FontWeight.normal,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}