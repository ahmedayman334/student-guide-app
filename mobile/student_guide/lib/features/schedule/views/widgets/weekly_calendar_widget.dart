import 'package:flutter/material.dart';
import 'package:student_guide/core/theming/app_colors.dart';
import 'package:student_guide/core/theming/app_text_style.dart';
import 'package:student_guide/features/schedule/views/widgets/week_day_item.dart';

class WeeklyCalendarWidget extends StatefulWidget {
  const WeeklyCalendarWidget({super.key});

  @override
  State<WeeklyCalendarWidget> createState() => _WeeklyCalendarWidgetState();
}

class _WeeklyCalendarWidgetState extends State<WeeklyCalendarWidget> {
  late int selectedIndex;
  late List<DateTime> weekDays;

  final List<String> dayNames = [
    'SAT',
    'SUN',
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
  ];

  @override
  void initState() {
    super.initState();
    final now = DateTime.now();
    final saturday = now.subtract(Duration(days: (now.weekday + 1) % 7));
    weekDays = List.generate(7, (i) => saturday.add(Duration(days: i)));
    selectedIndex = (now.weekday + 1) % 7;
  }

  String get monthYear {
    const months = [
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
    return '${months[weekDays[0].month - 1]} ${weekDays[0].year}';
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // ── Header ──────────────────────────────────────
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

        // ── Days Row ─────────────────────────────────────
        Container(
          padding: const EdgeInsets.symmetric(vertical: 8),
          decoration: BoxDecoration(
            color: AppColors.cardBackground,
            borderRadius: BorderRadius.circular(16),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: weekDays.asMap().entries.map((entry) {
              return WeekDayItem(
                dayName: dayNames[entry.key],
                dayNumber: entry.value.day,
                isSelected: entry.key == selectedIndex,
                isWeekend: entry.key == 6, // friday
                onTap: () => setState(() => selectedIndex = entry.key),
              );
            }).toList(),
          ),
        ),
      ],
    );
  }
}
