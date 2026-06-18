// lib/features/schedule/views/widgets/exam_reminder_card.dart

import 'package:flutter/material.dart';
import 'package:student_guide/core/theming/app_colors.dart';

enum ExamStatus { inDays, upcoming }

class ExamReminderItem {
  final String title;
  final String date;
  final String location;
  final String time;
  final ExamStatus status;
  final int? daysLeft;

  const ExamReminderItem({
    required this.title,
    required this.date,
    required this.location,
    required this.time,
    required this.status,
    this.daysLeft,
  });
}

class ExamReminderCard extends StatelessWidget {
  final List<ExamReminderItem> exams;

  const ExamReminderCard({super.key, required this.exams});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.surface,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Exam Reminders',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: Theme.of(context).textTheme.bodyMedium?.color,
                ),
              ),
              const Icon(Icons.campaign_rounded, color: Colors.redAccent, size: 22),
            ],
          ),
          const SizedBox(height: 12),
          ...exams.map((e) => _ExamItem(exam: e)),
          const SizedBox(height: 4),
          Center(
            child: TextButton(
              onPressed: () {},
              child: Text(
                'View Exam Schedule',
                style: TextStyle(
                  color: Theme.of(context).colorScheme.primary,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _ExamItem extends StatelessWidget {
  final ExamReminderItem exam;
  const _ExamItem({required this.exam});

  @override
  Widget build(BuildContext context) {
    final isInDays = exam.status == ExamStatus.inDays;
    final badgeColor = isInDays ? const Color(0xFFFF6B35) : const Color(0xFFFFC107);
    final badgeText = isInDays ? 'IN ${exam.daysLeft} DAYS' : 'UPCOMING';

    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Theme.of(context).brightness == Brightness.dark
            ? AppColors.darkSurfaceGrey
            : const Color(0xFFF8F9FF),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: badgeColor.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(
              isInDays ? Icons.description_outlined : Icons.architecture,
              color: badgeColor,
              size: 20,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  exam.title,
                  style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14),
                ),
                Text(
                  '${exam.date} • ${exam.location} • ${exam.time}',
                  style: TextStyle(color: Theme.of(context).textTheme.bodySmall?.color, fontSize: 12),
                ),
                const SizedBox(height: 4),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(
                    color: badgeColor,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    badgeText,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}