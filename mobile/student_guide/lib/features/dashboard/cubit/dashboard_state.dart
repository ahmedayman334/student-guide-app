part of 'dashboard_cubit.dart';

class DashboardState extends Equatable {
  final List<QuickTaskModel> tasks;

  const DashboardState({this.tasks = const []});

  factory DashboardState.initial() => const DashboardState();

  DashboardState copyWith({List<QuickTaskModel>? tasks}) {
    return DashboardState(tasks: tasks ?? this.tasks);
  }

  @override
  List<Object?> get props => [tasks];
}