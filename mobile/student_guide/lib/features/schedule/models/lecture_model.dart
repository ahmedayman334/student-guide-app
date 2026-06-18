import '../views/widgets/lecture_type_enum.dart';

class LectureModel {
  final String id;
  final String subject;
  final String room;
  final String startTime;
  final String endTime;
  final LectureType type;
  final int weekday; // 0 = Saturday ... 6 = Friday
  final String? professor; // optional — provided by API when available

  const LectureModel({
    required this.id,
    required this.subject,
    required this.room,
    required this.startTime,
    required this.endTime,
    required this.type,
    required this.weekday,
    this.professor,
  });
String get professorName {
  if (subject.contains('Database')) return 'Dr. Mosaad';
  if (subject.contains('Chemistry')) return 'Dr. Aris';
  if (subject.contains('Calculus') || subject.contains('Architecture')) return 'Dr. Harrison';
  if (subject.contains('Literature')) return 'Prof. Blake';
  if (subject.contains('Algorithms')) return 'Dr. Selim';
  if (subject.contains('Networks')) return 'Prof. Ryan';
  if (subject.contains('Software')) return 'Dr. Amin';
  return 'Staff';
}
  // ── Deserialization ────────────────────────────────────────────────────────
  // Expected JSON shape (adjust field names to match actual API response):
  // {
  //   "id": "1",
  //   "subject": "Database Systems",
  //   "room": "Lab 2",
  //   "start_time": "10:30 AM",
  //   "end_time": "12:30 PM",
  //   "type": "lecture",        // "lecture" | "section"
  //   "weekday": 2,             // 0 = Saturday … 6 = Friday
  //   "professor": "Dr. Mosaad" // optional
  // }
  factory LectureModel.fromJson(Map<String, dynamic> json) {
    return LectureModel(
      id: json['id']?.toString() ?? '',
      subject: json['subject'] as String,
      room: json['room'] as String,
      startTime: json['start_time'] as String,
      endTime: json['end_time'] as String,
      type: LectureType.values.firstWhere(
        (e) => e.name == (json['type'] as String?)?.toLowerCase(),
        orElse: () => LectureType.lecture,
      ),
      weekday: json['weekday'] as int,
      professor: json['professor'] as String?,
    );
  }

  // ── Serialization ──────────────────────────────────────────────────────────
  Map<String, dynamic> toJson() => {
        'id': id,
        'subject': subject,
        'room': room,
        'start_time': startTime,
        'end_time': endTime,
        'type': type.name,
        'weekday': weekday,
        if (professor != null) 'professor': professor,
      };
}