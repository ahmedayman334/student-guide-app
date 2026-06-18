import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:student_guide/features/dashboard/models/stat_card_model.dart';
import 'package:student_guide/features/dashboard/views/widgets/stat_card_widget.dart';
import 'package:student_guide/features/gpa_calculator/cubit/gpa_cubit.dart';
import 'package:student_guide/features/gpa_calculator/cubit/gpa_state.dart';
import 'package:student_guide/features/schedule/cubit/schedule_cubit.dart';

class StatCardGridView extends StatelessWidget {
  const StatCardGridView({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<GpaCubit, GpaState>(
      builder: (context, gpaState) {
        return BlocBuilder<ScheduleCubit, ScheduleState>(
          builder: (context, scheduleState) {
            final gpaValue = gpaState.currentCgpa == 0.0
                ? '—'
                : gpaState.currentCgpa.toStringAsFixed(2);

            final nextLecture = scheduleState.todayLectures.isEmpty
                ? null
                : scheduleState.todayLectures.first;

            final cards = [
              StatCardModel(
                title: 'Current GPA',
                value: gpaValue,
                subtitle: gpaState.lastGpa == 0.0
                    ? null
                    : 'Last: ${gpaState.lastGpa.toStringAsFixed(2)}',
              ),
              StatCardModel(
                title: 'Subjects',
                value: scheduleState.lectures
                    .map((l) => l.subject)
                    .toSet()
                    .length
                    .toString(),
              ),
              StatCardModel(
                title: 'Next Lecture',
                value: nextLecture?.subject ?? '—',
                subtitle: nextLecture?.startTime,
              ),
              const StatCardModel(
                title: 'Upcoming Exams',
                value: '2',
                subtitle: 'Next: Friday',
              ),
            ];

            return SliverPadding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              sliver: SliverGrid(
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: 16,
                  mainAxisSpacing: 16,
                  childAspectRatio: 1.5,
                ),
                delegate: SliverChildListDelegate(
                  cards
                      .map(
                        (card) => StatCard(
                          title: card.title,
                          value: card.value,
                          subtitle: card.subtitle,
                        ),
                      )
                      .toList(),
                ),
              ),
            );
          },
        );
      },
    );
  }
}
