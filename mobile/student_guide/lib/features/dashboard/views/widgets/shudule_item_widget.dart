import 'package:flutter/material.dart';
import 'package:student_guide/core/theming/app_colors.dart';
import 'package:student_guide/core/theming/app_text_style.dart';

class ScheduleItemWidget extends StatelessWidget {
  // final IconData icon;
  final String subject;
  final String room;
  final String professor;
  final String time;
  final String? badge; // e.g. "IN 15M" or "2 HOURS" — null = no badge
  final bool isNext; // true = highlighted with left border + colored bg

  const ScheduleItemWidget({
    super.key,
    // required this.icon,
    required this.subject,
    required this.room,
    required this.professor,
    required this.time,
    this.badge,
    this.isNext = false,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: isNext ? AppColors.background : AppColors.cardScheduleBackground,
        border: Border(
          left: BorderSide(
            color: isNext ? AppColors.accent : Colors.transparent,
            width: 3,
          ),
        ),
        borderRadius: BorderRadius.circular(8),
      ),

      padding: const EdgeInsets.all(12),
      child: Row(
        children: [
          // icon container
          // const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  subject,
                  style: AppTextStyles.heading2.copyWith(
                    color: AppColors.textPrimary,
                  ),
                ),
                Text(
                  "$room • $professor",
                  style: AppTextStyles.bodyMedium.copyWith(
                    color: AppColors.textPrimary,
                  ),
                ),
              ],
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                time,
                style: AppTextStyles.timeSlot.copyWith(
                  color: AppColors.textPrimary,
                ),
              ),

              if (badge != null)
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 8,
                    vertical: 3,
                  ),
                  decoration: BoxDecoration(
                    color: AppColors.accent,
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: Text(
                    badge!,
                    style: AppTextStyles.badge.copyWith(
                      color: AppColors.background,
                    ),
                  ),
                ),
            ],
          ),
        ],
      ),
    );
  }
}
