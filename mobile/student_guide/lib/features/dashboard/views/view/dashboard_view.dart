// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:flutter/material.dart';
import 'package:student_guide/features/dashboard/views/widgets/boost_your_gpa_widget.dart';
import 'package:student_guide/features/dashboard/views/widgets/quick_tasks_widget.dart';
import 'package:student_guide/features/dashboard/views/widgets/stat_card_grid_view.dart';
import 'package:student_guide/features/dashboard/views/widgets/today_schedule_widget.dart';
import 'package:student_guide/features/dashboard/views/widgets/welcome_message_widget.dart';

class DashboardView extends StatelessWidget {
  const DashboardView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(
            child: WelcomeMessage(name: 'Ahmed', classCount: 3),
          ),
          StatCardGridView(),
          TodayScheduleWidget(),
          SliverToBoxAdapter(child: BoostGpaBanner()),
          SliverToBoxAdapter(child: QuickTasksWidget()),
        ],
      ),
    );
  }
}
