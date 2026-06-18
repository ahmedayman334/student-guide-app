import 'package:hive/hive.dart';
import 'package:student_guide/features/gpa_calculator/models/subject_entry_model.dart';

 part 'gpa_snapshot_model.g.dart';

@HiveType(typeId: 2)
class GpaSnapshotModel {
  @HiveField(0)
  final List<SubjectEntry> subjects;
  @HiveField(1)
  final double targetCgpa;
  @HiveField(2)
  final double currentCgpa;
  @HiveField(3)
  final double lastGpa;
  @HiveField(4)
  final int totalCredits;

  GpaSnapshotModel({
    required this.subjects,
    required this.targetCgpa,
    required this.currentCgpa,
    required this.lastGpa,
    required this.totalCredits,
  });
}