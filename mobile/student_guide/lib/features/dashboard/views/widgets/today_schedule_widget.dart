import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:student_guide/core/theming/app_text_style.dart';
import 'package:student_guide/features/dashboard/views/widgets/shudule_item_widget.dart';
import 'package:student_guide/features/schedule/cubit/schedule_cubit.dart';

class TodayScheduleWidget extends StatelessWidget {
  const TodayScheduleWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<ScheduleCubit, ScheduleState>(
      builder: (context, state) {
        final lectures = state.todayLectures;
        return SliverPadding(
          padding: const EdgeInsets.all(18),
          sliver: SliverList(
            delegate: SliverChildListDelegate([
              Text("Today's Schedule", style: AppTextStyles.heading2),
              const SizedBox(height: 16),
              ...lectures.asMap().entries.map((entry) {
                final lecture = entry.value;
                return Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: ScheduleItemWidget(
                    subject: lecture.subject,
                    room: lecture.room,
                    professor: lecture.professorName,
                    time: '${lecture.startTime} - ${lecture.endTime}',
                    isNext: entry.key == 0,
                  ),
                );
              }),
            ]),
          ),
        );
      },
    );
  }
}