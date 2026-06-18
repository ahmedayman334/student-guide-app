import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:student_guide/features/dashboard/models/quick_task_model.dart';
import 'package:student_guide/features/dashboard/repository/todo_repo.dart';

part 'dashboard_state.dart';

class DashboardCubit extends Cubit<DashboardState> {
  final TodoRepository _repo;

  DashboardCubit(this._repo) : super(DashboardState.initial()) {
    _loadTasks();
  }

  Future<void> _loadTasks() async {
    final tasks = await _repo.fetchTodos();
    emit(state.copyWith(tasks: tasks));
  }

  Future<void> addTask(String title) async {
    final task = await _repo.createTodo(title);
    emit(state.copyWith(tasks: [...state.tasks, task]));
  }

  Future<void> toggleTask(String id) async {
    final task = state.tasks.firstWhere((t) => t.id == id);
    final updated = task.copyWith(isDone: !task.isDone);
    await _repo.updateTodo(updated);
    emit(state.copyWith(tasks: state.tasks.map((t) => t.id == id ? updated : t).toList()));
  }

  Future<void> removeTask(String id) async {
    await _repo.deleteTodo(id);
    emit(state.copyWith(tasks: state.tasks.where((t) => t.id != id).toList()));
  }
}