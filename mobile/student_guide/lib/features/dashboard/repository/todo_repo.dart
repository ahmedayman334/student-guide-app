import 'package:student_guide/features/dashboard/models/quick_task_model.dart';

abstract class TodoRepository {
  Future<List<QuickTaskModel>> fetchTodos();
  Future<QuickTaskModel> createTodo(String title);
  Future<void> updateTodo(QuickTaskModel todo);
  Future<void> deleteTodo(String id);
}