import '../views/widgets/lecture_type_enum.dart';

class LectureModel {
  final String id;
  final String subject;
  final String room;
  final String startTime;
  final String endTime;
  final LectureType type;
  final int weekday; // 0 = Saturday ... 6 = Friday

  const LectureModel({
    required this.id,
    required this.subject,
    required this.room,
    required this.startTime,
    required this.endTime,
    required this.type,
    required this.weekday,
  });
}