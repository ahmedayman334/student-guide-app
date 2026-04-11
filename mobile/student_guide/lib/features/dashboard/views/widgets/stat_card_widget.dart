import 'package:flutter/material.dart';
import 'package:student_guide/core/theming/app_text_style.dart';

class StatCard extends StatelessWidget {
  final String title;
  final String value;
  final IconData icon;
  final Color iconColor;
  final Color iconBackgroundColor;
  const StatCard({
    super.key,
    required this.title,
    required this.value,
    required this.icon,
    required this.iconColor,
    required this.iconBackgroundColor,
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

      child: Row(
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,

            children: [
              Text(title, style: AppTextStyles.bodyMedium),
              Text(value, style: AppTextStyles.heading1),
            ],
          ),
          const Spacer(),
          Container(
            decoration: BoxDecoration(
              color: iconBackgroundColor,

              borderRadius: BorderRadius.circular(10),
            ),
            height: 40,
            width: 40,

            child: Center(child: Icon(icon, color: iconColor)),
          ),
        ],
      ),
    );
  }
}
