import 'package:flutter/material.dart';
import 'package:student_guide/features/schedule/views/widgets/add_lecture_form.dart';
import 'package:student_guide/features/schedule/views/widgets/exam_reminder_card.dart';
import 'package:student_guide/features/schedule/views/widgets/schedule_stat_card.dart';
import 'package:student_guide/features/schedule/views/widgets/smart_alert_banner.dart';
import 'package:student_guide/features/schedule/views/widgets/study_tip_card.dart';
import 'package:student_guide/features/schedule/views/widgets/weekly_calendar_widget.dart';

class ScheduleView extends StatelessWidget {
  const ScheduleView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SmartAlertBanner(),
            const SizedBox(height: 16),
            const WeeklyCalendarWidget(),
            const SizedBox(height: 22),
            const AddLectureForm(),
            const SizedBox(height: 16),
            const ScheduleStatCard(
              label: 'Total Lectures',
              value: '04',
              backgroundColor: Color(0xFF26C6DA),
              icon: Icons.menu_book_rounded,
            ),
            const SizedBox(height: 12),
            const ScheduleStatCard(
              label: 'Lab Hours',
              value: '2.5h',
              backgroundColor: Color(0xFFFFA726),
              icon: Icons.science_rounded,
            ),
            const SizedBox(height: 16),
            ExamReminderCard(
              exams: const [
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
            const SizedBox(height: 16),
            const StudyTipCard(
              tip: 'The expert in anything was once a beginner.',
            ),
            const SizedBox(height: 80),
          ],
        ),
      ),
    );
  }
}