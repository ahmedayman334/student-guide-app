import 'package:hive/hive.dart';
import 'package:student_guide/features/dashboard/models/quick_task_model.dart';
import 'package:student_guide/features/dashboard/repository/todo_repo.dart';

class LocalTodoRepository implements TodoRepository {
  static const _boxName = 'tasksBox';

  Future<Box<QuickTaskModel>> _openBox() => Hive.openBox<QuickTaskModel>(_boxName);

  @override
  Future<List<QuickTaskModel>> fetchTodos() async {
    final box = await _openBox();
    return box.values.toList();
  }

  @override
  Future<QuickTaskModel> createTodo(String title) async {
    final box = await _openBox();
    final task = QuickTaskModel(id: DateTime.now().millisecondsSinceEpoch.toString(), title: title);
    await box.put(task.id, task);
    return task;
  }

  @override
  Future<void> updateTodo(QuickTaskModel todo) async {
    final box = await _openBox();
    await box.put(todo.id, todo);
  }

  @override
  Future<void> deleteTodo(String id) async {
    final box = await _openBox();
    await box.delete(id);
  }
}