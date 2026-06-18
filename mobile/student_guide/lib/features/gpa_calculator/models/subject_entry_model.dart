import 'package:hive/hive.dart';

 part 'subject_entry_model.g.dart';


@HiveType(typeId: 1)
class SubjectEntry {
  @HiveField(0)
  String name;
  @HiveField(1)
  int credits;
  @HiveField(2)
  double? grade;

  SubjectEntry({this.name = '', this.credits = 0, this.grade});
}