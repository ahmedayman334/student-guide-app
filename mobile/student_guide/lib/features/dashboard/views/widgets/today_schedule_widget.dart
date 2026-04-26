import 'package:flutter/material.dart';
import 'package:student_guide/core/theming/app_text_style.dart';
import 'package:student_guide/features/dashboard/views/widgets/shudule_item_widget.dart';

class TodayScheduleWidget extends StatelessWidget {
  const TodayScheduleWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return SliverPadding(
      padding: EdgeInsetsGeometry.all(18),

      sliver: SliverList(
        delegate: SliverChildListDelegate([
          Text("Today's Schedule", style: AppTextStyles.heading2),
          SizedBox(height: 16),
          ScheduleItemWidget(
            subject: "data base",
            room: " Lab 2",
            professor: " Dr mosaad",
            time: "10:30",
            isNext: true,
            badge: "10 min",
          ),
          const SizedBox(height: 8),

          ScheduleItemWidget(
            subject: "Organic Chemistry Lab",
            room: "Lab B",
            professor: "Dr. Aris",
            time: "01:00 PM",
            badge: "2 HOURS",
          ),
          const SizedBox(height: 8),
          ScheduleItemWidget(
            subject: "Modern Literature",
            room: "Hall C",
            professor: "Prof. Blake",
            time: "03:30 PM",
          ),
        ]),
      ),
    );
  }
}
