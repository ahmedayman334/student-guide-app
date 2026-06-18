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
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    
    final primaryColor = theme.colorScheme.primary;
    final hintColor = isDark ? AppColors.darkTextHint : AppColors.textHint;
    final secondaryColor = theme.textTheme.bodySmall?.color ?? AppColors.textSecondary;
    final primaryTextColor = theme.textTheme.bodyMedium?.color ?? AppColors.textPrimary;

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
                    ? primaryColor
                    : isWeekend
                        ? hintColor
                        : secondaryColor,
              ),
            ),
            const SizedBox(height: 6),
            Container(
              width: 36,
              height: 36,
              decoration: BoxDecoration(
                color: isSelected ? primaryColor : Colors.transparent,
                shape: BoxShape.circle,
              ),
              alignment: Alignment.center,
              child: Text(
                '$dayNumber',
                style: AppTextStyles.bodyMedium.copyWith(
                  color: isSelected
                      ? Colors.white
                      : isWeekend
                          ? hintColor
                          : primaryTextColor,
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