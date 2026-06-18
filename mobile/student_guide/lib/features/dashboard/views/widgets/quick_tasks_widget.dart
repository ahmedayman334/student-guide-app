import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:student_guide/core/theming/app_colors.dart';
import 'package:student_guide/core/theming/app_text_style.dart';
import 'package:student_guide/features/dashboard/cubit/dashboard_cubit.dart';

class QuickTasksWidget extends StatelessWidget {
  const QuickTasksWidget({super.key});

  void _addNewTask(BuildContext context) {
    final cubit = context.read<DashboardCubit>();
    showDialog(
      context: context,
      builder: (context) {
        final controller = TextEditingController();
        return AlertDialog(
          title: const Text("Add New Task"),
          content: TextField(
            controller: controller,
            decoration: const InputDecoration(hintText: "Enter task title", border: OutlineInputBorder()),
            autofocus: true,
          ),
          actions: [
            TextButton(onPressed: () => Navigator.pop(context), child: const Text("Cancel")),
            TextButton(
              onPressed: () {
                if (controller.text.trim().isNotEmpty) {
                  cubit.addTask(controller.text.trim());
                  Navigator.pop(context);
                }
              },
              child: const Text("Add"),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<DashboardCubit, DashboardState>(
      builder: (context, state) {
        return Container(
          margin: const EdgeInsets.all(16),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(color: Theme.of(context).colorScheme.surface, borderRadius: BorderRadius.circular(16)),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text("Quick Tasks", style: AppTextStyles.heading2),
                  IconButton(onPressed: () => _addNewTask(context), icon: const Icon(Icons.add_circle, color: AppColors.primary)),
                ],
              ),
              const SizedBox(height: 8),
              ...state.tasks.map((task) {
                return Row(
                  children: [
                    Checkbox(
                      value: task.isDone,
                      activeColor: AppColors.primary,
                      onChanged: (_) => context.read<DashboardCubit>().toggleTask(task.id),
                    ),
                    Expanded(
                      child: Text(
                        task.title,
                        style: AppTextStyles.bodyMedium.copyWith(
                          decoration: task.isDone ? TextDecoration.lineThrough : TextDecoration.none,
                          color: task.isDone ? AppColors.textSecondary : AppColors.textPrimary,
                        ),
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.delete_outline, size: 20),
                      color: AppColors.textSecondary,
                      onPressed: () => context.read<DashboardCubit>().removeTask(task.id),
                    ),
                  ],
                );
              }),
            ],
          ),
        );
      },
    );
  }
}