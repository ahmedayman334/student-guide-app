import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:student_guide/core/theming/app_text_style.dart';
import 'package:student_guide/features/gpa_calculator/cubit/gpa_cubit.dart';
import 'package:student_guide/features/gpa_calculator/cubit/gpa_state.dart';
import 'package:student_guide/features/gpa_calculator/views/widgets/academic_history_card.dart';
import 'package:student_guide/features/gpa_calculator/views/widgets/estimated_gpa_card.dart';
import 'package:student_guide/features/gpa_calculator/views/widgets/performance_card.dart';
import 'package:student_guide/features/gpa_calculator/views/widgets/semester_subjects_card.dart';
import 'package:student_guide/features/gpa_calculator/views/widgets/target_cgpa_planner.dart';

class GpaCalculatorView extends StatelessWidget {
  const GpaCalculatorView({super.key});

  @override
  Widget build(BuildContext context) {
    return const _GpaBody();
  }
}

class _GpaBody extends StatelessWidget {
  const _GpaBody();

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<GpaCubit, GpaState>(
      builder: (context, state) {
        final cubit = context.read<GpaCubit>();
        return Scaffold(
          body: SingleChildScrollView(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 10,
                    vertical: 4,
                  ),
                  decoration: BoxDecoration(
                    color: Theme.of(context).colorScheme.primary.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Text(
                    'ACADEMIC TOOL',
                    style: AppTextStyles.sectionLabel.copyWith(
                      color: Theme.of(context).colorScheme.primary,
                    ),
                  ),
                ),
                const SizedBox(height: 8),
                Text('GPA Strategy', style: AppTextStyles.displayTitle),
                const SizedBox(height: 4),
                Text(
                  'Simulate your semester outcomes and plan your path to academic excellence with precision.',
                  style: AppTextStyles.bodyMedium.copyWith(
                    color: Theme.of(context).textTheme.bodySmall?.color,
                  ),
                ),
                AcademicHistoryCard(
                  currentCgpa: state.currentCgpa,
                  totalCredits: state.totalCredits,
                  lastGpa: state.lastGpa,
                  onCgpaChanged: cubit.updateCurrentCgpa,
                  onCreditsChanged: cubit.updateTotalCredits,
                  onLastGpaChanged: cubit.updateLastGpa,
                ),
                const SizedBox(height: 16),
                SemesterSubjectsCard(
                  subjects: state.subjects,
                  onAdd: cubit.addSubject,
                  onChanged: cubit.updateSubject,
                  onDelete: cubit.deleteSubject,
                ),
                const SizedBox(height: 16),
                TargetCgpaPlanner(
                  currentCgpa: state.currentCgpa,
                  targetCgpa: state.targetCgpa,
                  totalCredits: state.totalCredits,
                  onTargetChanged: cubit.setTargetCgpa,
                ),
                const SizedBox(height: 16),
                EstimatedGpaCard(gpa: state.estimatedGpa),
                const SizedBox(height: 16),
                PerformanceCard(
                  currentGpa: state.estimatedGpa > 0
                      ? state.estimatedGpa
                      : state.currentCgpa,
                  lastGpa: state.lastGpa,
                  totalCredits: state.totalCredits,
                  strategyTip: state.strategyTip,
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