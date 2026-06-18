import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:student_guide/features/dashboard/views/widgets/boost_your_gpa_widget.dart';
import 'package:student_guide/features/dashboard/views/widgets/quick_tasks_widget.dart';
import 'package:student_guide/features/dashboard/views/widgets/stat_card_grid_view.dart';
import 'package:student_guide/features/dashboard/views/widgets/today_schedule_widget.dart';
import 'package:student_guide/features/dashboard/views/widgets/welcome_message_widget.dart';
import 'package:student_guide/features/schedule/cubit/schedule_cubit.dart';

class DashboardView extends StatelessWidget {
  const DashboardView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(
            child: BlocBuilder<ScheduleCubit, ScheduleState>(
              builder: (context, state) {
                return WelcomeMessage(
                  name: 'Ahmed',
                  classCount: state.todayLectures.length,
                );
              },
            ),
          ),
          const StatCardGridView(),
          const TodayScheduleWidget(),
          const SliverToBoxAdapter(child: BoostGpaBanner()),
          const SliverToBoxAdapter(child: QuickTasksWidget()),
        ],
      ),
    );
  }
}
