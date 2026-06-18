import 'package:flutter/material.dart';
import 'package:student_guide/core/theming/app_text_style.dart';

class StatCard extends StatelessWidget {
  final String title;
  final String value;
  final String? subtitle;

  const StatCard({
    super.key,
    required this.title,
    required this.value,
    this.subtitle,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.surface,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withAlpha(20),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,

        children: [
          Text(
            title,
            style: AppTextStyles.cardLabel.copyWith(
              color: Theme.of(context).textTheme.bodySmall?.color,
            ),
          ),

          const SizedBox(height: 6),
          Text(
            value,
            style: AppTextStyles.statNumber.copyWith(
              color: Theme.of(context).textTheme.bodyMedium?.color,
            ),
          ),
          const SizedBox(height: 10),
          if (subtitle != null) Text(subtitle!, style: AppTextStyles.bodySmall),
        ],
      ),
    );
  }
}
