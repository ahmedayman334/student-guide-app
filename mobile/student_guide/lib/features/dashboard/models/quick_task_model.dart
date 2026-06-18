import 'package:equatable/equatable.dart';
import 'package:hive/hive.dart';

part 'quick_task_model.g.dart';

@HiveType(typeId: 0)
class QuickTaskModel extends Equatable {
  @HiveField(0)
  final String id;
  @HiveField(1)
  final String title;
  @HiveField(2)
  final bool isDone;

  const QuickTaskModel({required this.id, required this.title, this.isDone = false});

  QuickTaskModel copyWith({String? title, bool? isDone}) {
    return QuickTaskModel(id: id, title: title ?? this.title, isDone: isDone ?? this.isDone);
  }

  @override
  List<Object?> get props => [id, title, isDone];
}