import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:student_guide/core/theming/app_colors.dart';
import 'package:student_guide/core/theming/app_text_style.dart';
import 'package:student_guide/features/dashboard/views/widgets/shudule_item_widget.dart';
import 'package:student_guide/features/schedule/cubit/schedule_cubit.dart';
import 'package:student_guide/features/schedule/views/widgets/exam_reminder_card.dart';
import 'package:student_guide/features/schedule/views/widgets/lecture_type_enum.dart';
import 'package:student_guide/features/schedule/views/widgets/schedule_stat_card.dart';
import 'package:student_guide/features/schedule/views/widgets/weekly_calendar_widget.dart';

class ScheduleView extends StatelessWidget {
  const ScheduleView({super.key});

  @override
  Widget build(BuildContext context) {
    return const _ScheduleBody();
  }
}

class _ScheduleBody extends StatelessWidget {
  const _ScheduleBody();

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<ScheduleCubit, ScheduleState>(
      builder: (context, state) {
        final todayLectures = state.todayLectures;
        final totalLectures = todayLectures.length;
        final labHours =
            todayLectures.where((l) => l.type == LectureType.section).length *
                2.0;

        return Scaffold(
          body: SingleChildScrollView(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(height: 16),
                const WeeklyCalendarWidget(),
                const SizedBox(height: 22),
                const _SectionHeader(title: "Today's Lectures"),
                const SizedBox(height: 12),
                if (todayLectures.isEmpty)
                  const _EmptyDay()
                else
                  ...todayLectures.asMap().entries.map((entry) {
                    final lecture = entry.value;
                    final isFirst = entry.key == 0;
                    final isLab = lecture.type == LectureType.section;
                    return Padding(
                      padding: const EdgeInsets.only(bottom: 12),
                      child: ScheduleItemWidget(
                        subject: lecture.subject,
                        room: lecture.room,
                        professor: lecture.professorName,
                        time: '${lecture.startTime} - ${lecture.endTime}',
                        isNext: isFirst,
                        badge: isLab ? 'LAB' : 'LECTURE',
                      ),
                    );
                  }),
                const SizedBox(height: 22),
                const _SectionHeader(title: 'Day Statistics'),
                const SizedBox(height: 12),
                ScheduleStatCard(
                  label: 'Total Lectures',
                  value: totalLectures.toString().padLeft(2, '0'),
                  backgroundColor: const Color(0xFF26C6DA),
                  icon: Icons.menu_book_rounded,
                ),
                const SizedBox(height: 12),
                ScheduleStatCard(
                  label: 'Lab Hours',
                  value: '${labHours.toStringAsFixed(1)}h',
                  backgroundColor: const Color(0xFFFFA726),
                  icon: Icons.science_rounded,
                ),
                const SizedBox(height: 22),
                const _SectionHeader(title: 'Reminders'),
                const SizedBox(height: 12),
                const ExamReminderCard(
                  exams: [
                    ExamReminderItem(
                      title: 'Thermodynamics Midterm',
                      date: 'Oct 24',
                      location: 'Hall A',
                      time: '10:00 AM',
                      status: ExamStatus.inDays,
                      daysLeft: 7,
                    ),
                    ExamReminderItem(
                      title: 'Engineering Graphics',
                      date: 'Oct 30',
                      location: 'Lab 01',
                      time: '02:00 PM',
                      status: ExamStatus.upcoming,
                    ),
                  ],
                ),
                const SizedBox(height: 80),
              ],
            ),
          ),
        );
      },
    );
  }
}

class _SectionHeader extends StatelessWidget {
  final String title;
  const _SectionHeader({required this.title});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(
          width: 4,
          height: 24,
          decoration: BoxDecoration(color: AppColors.primary, borderRadius: BorderRadius.circular(2)),
        ),
        const SizedBox(width: 8),
        Text(title, style: AppTextStyles.heading2),
      ],
    );
  }
}

class _EmptyDay extends StatelessWidget {
  const _EmptyDay();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(vertical: 32, horizontal: 16),
      decoration: BoxDecoration(
        color: AppColors.cardBackground,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.grey.shade200),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.calendar_today_outlined, color: AppColors.textSecondary.withValues(alpha: 0.5), size: 40),
          const SizedBox(height: 12),
          Text('No lectures scheduled for this day.', style: AppTextStyles.bodyMedium.copyWith(color: AppColors.textSecondary)),
        ],
      ),
    );
  }
}