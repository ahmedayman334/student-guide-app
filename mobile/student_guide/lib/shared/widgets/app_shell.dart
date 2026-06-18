import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:student_guide/features/dashboard/cubit/dashboard_cubit.dart';
import 'package:student_guide/features/dashboard/repository/local_todo_repo.dart';
import 'package:student_guide/features/gpa_calculator/cubit/gpa_cubit.dart';
import 'package:student_guide/features/gpa_calculator/repository/local_gpa_repository.dart';
import 'package:student_guide/features/schedule/cubit/schedule_cubit.dart';
import 'package:student_guide/shared/widgets/shell_app_bar.dart';

class AppShell extends StatelessWidget {
  final StatefulNavigationShell navigationShell;

  const AppShell({super.key, required this.navigationShell});

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
  providers: [
BlocProvider(create: (_) => GpaCubit(LocalGpaRepository())),
    BlocProvider(create: (_) => ScheduleCubit()),
BlocProvider(create: (_) => DashboardCubit(LocalTodoRepository())),

  ],
  child: Scaffold(
        appBar: ShellAppBar(),
        body: navigationShell,
        bottomNavigationBar: NavigationBar(
          selectedIndex: navigationShell.currentIndex,
          onDestinationSelected: (index) => navigationShell.goBranch(index),
          destinations: const [
            NavigationDestination(
              icon: Icon(Icons.dashboard_outlined),
              selectedIcon: Icon(Icons.dashboard),
              label: 'Dashboard',
            ),
            NavigationDestination(
              icon: Icon(Icons.school_outlined),
              selectedIcon: Icon(Icons.school),
              label: 'Academic',
            ),
            NavigationDestination(
              icon: Icon(Icons.calculate_outlined),
              selectedIcon: Icon(Icons.calculate),
              label: 'GPA',
            ),
            NavigationDestination(
              icon: Icon(Icons.calendar_month_outlined),
              selectedIcon: Icon(Icons.calendar_month),
              label: 'Schedule',
            ),
            NavigationDestination(
              icon: Icon(Icons.link_outlined),
              selectedIcon: Icon(Icons.link),
              label: 'Quick Links',
            ),
          ],
        ),
      ),
    );
  }
}