import 'package:flutter/material.dart';
import 'package:student_guide/core/theming/app_colors.dart';
import 'package:student_guide/core/theming/app_text_style.dart';

class QuickTasksWidget extends StatefulWidget {
  const QuickTasksWidget({super.key});

  @override
  State<QuickTasksWidget> createState() => _QuickTasksWidgetState();
}

class _QuickTasksWidgetState extends State<QuickTasksWidget> {
  final List<Map<String, dynamic>> _tasks = [
    {"title": "Finish Lab Report", "done": false},
    {"title": "Buy New Notebooks", "done": true},
    {"title": "Email Professor Higgins", "done": false},
    {"title": "Update Portfolio", "done": false},
  ];

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(16),

      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.surface,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        children: [
          // Header
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text("Quick Tasks", style: AppTextStyles.heading2),
              IconButton(
                onPressed: () {},
                icon: const Icon(Icons.add_circle, color: AppColors.primary),
              ),
            ],
          ),
          const SizedBox(height: 8),
          // Tasks list
          ..._tasks.asMap().entries.map((entry) {
            final index = entry.key;
            final task = entry.value;
            return Row(
              children: [
                Checkbox(
                  value: task["done"],
                  activeColor: AppColors.primary,
                  onChanged: (_) => setState(() {
                    _tasks[index]["done"] = !_tasks[index]["done"];
                  }),
                ),
                Text(
                  task["title"],
                  style: AppTextStyles.bodyMedium.copyWith(
                    decoration: task["done"]
                        ? TextDecoration.lineThrough
                        : TextDecoration.none,
                    color: task["done"]
                        ? AppColors.textSecondary
                        : AppColors.textPrimary,
                  ),
                ),
              ],
            );
          }),
        ],
      ),
    );
  }
}
