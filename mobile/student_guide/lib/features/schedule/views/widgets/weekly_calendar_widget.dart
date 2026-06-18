import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:student_guide/core/theming/app_colors.dart';
import 'package:student_guide/core/theming/app_text_style.dart';
import 'package:student_guide/features/schedule/cubit/schedule_cubit.dart';
import 'package:student_guide/features/schedule/views/widgets/week_day_item.dart';

class WeeklyCalendarWidget extends StatelessWidget {
  const WeeklyCalendarWidget({super.key});

  static const _dayNames = ['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI'];

  static const _months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<ScheduleCubit, ScheduleState>(
      builder: (context, state) {
        final monthYear =
            '${_months[state.weekDays[0].month - 1]} ${state.weekDays[0].year}';

        return Column(
          children: [
            // ── Header ───────────────────────────────────────────
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    Container(
                      width: 4,
                      height: 24,
                      decoration: BoxDecoration(
                        color: AppColors.primary,
                        borderRadius: BorderRadius.circular(2),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Text('Weekly Calendar', style: AppTextStyles.heading2),
                  ],
                ),
                Text(monthYear, style: AppTextStyles.bodySmall),
              ],
            ),
            const SizedBox(height: 12),

            // ── Days row ─────────────────────────────────────────
            Container(
              padding: const EdgeInsets.symmetric(vertical: 8),
              decoration: BoxDecoration(
                color: AppColors.cardBackground,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: state.weekDays.asMap().entries.map((entry) {
                  return WeekDayItem(
                    dayName: _dayNames[entry.key],
                    dayNumber: entry.value.day,
                    isSelected: entry.key == state.selectedIndex,
                    isWeekend: entry.key == 6,
                    onTap: () =>
                        context.read<ScheduleCubit>().selectDay(entry.key),
                  );
                }).toList(),
              ),
            ),
          ],
        );
      },
    );
  }
}
