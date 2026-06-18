// lib/features/schedule/data/schedule_repo.dart
//
// PHASE GUIDE
// ──────────────────────────────────────────────────────────────────────────────
// Phase 3 (now) : Inject MockScheduleRepository — UI + Cubit are fully wired.
// Phase 4 (next): Replace MockScheduleRepository with ApiScheduleRepository
//                 by swapping the concrete class in ScheduleView's BlocProvider.
// ──────────────────────────────────────────────────────────────────────────────

import 'package:student_guide/features/schedule/models/lecture_model.dart';
import 'package:student_guide/features/schedule/views/widgets/lecture_type_enum.dart';

// ── Exception ──────────────────────────────────────────────────────────────────
class ScheduleException implements Exception {
  final String message;
  const ScheduleException(this.message);

  @override
  String toString() => 'ScheduleException: $message';
}

// ── Abstract Contract ──────────────────────────────────────────────────────────
abstract class ScheduleRepository {
  /// Fetches the full weekly schedule for the current student.
  Future<List<LectureModel>> fetchSchedule();
}

// ── Phase 3: Local mock (no network) ──────────────────────────────────────────
/// Returns hard-coded data through the async layer so the entire cubit/view
/// pipeline works identically to the real API version.
/// Swap to [ApiScheduleRepository] in Phase 4.
class MockScheduleRepository implements ScheduleRepository {
  @override
  Future<List<LectureModel>> fetchSchedule() async {
    // Simulate a brief network round-trip
    await Future.delayed(const Duration(milliseconds: 700));
    return _mockSchedule;
  }
}

// ── Phase 4: Real API (uncomment + fill in base URL when ready) ───────────────
//
// Authentication note:
//   Recommended approach → store the Bearer token in flutter_secure_storage:
//     final storage = FlutterSecureStorage();
//     final token  = await storage.read(key: 'auth_token');
//   Then pass it as an Authorization header (see below).
//   If the team chooses Dio, add an AuthInterceptor instead.
//
// class ApiScheduleRepository implements ScheduleRepository {
//   final http.Client _client;
//   final String _scheduleUrl = AppApiEndpoints.schedule; // from links.dart
//
//   ApiScheduleRepository({http.Client? client})
//       : _client = client ?? http.Client();
//
//   @override
//   Future<List<LectureModel>> fetchSchedule() async {
//     final token = await _readToken(); // read from secure storage
//     final response = await _client.get(
//       Uri.parse(_scheduleUrl),
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer $token',
//       },
//     );
//
//     if (response.statusCode == 200) {
//       final body = json.decode(response.body) as Map<String, dynamic>;
//       final List<dynamic> data = body['data']; // adjust key to match API
//       return data
//           .map((e) => LectureModel.fromJson(e as Map<String, dynamic>))
//           .toList();
//     }
//     throw ScheduleException(
//       'Failed to load schedule (HTTP ${response.statusCode})',
//     );
//   }
//
//   Future<String?> _readToken() async {
//     const storage = FlutterSecureStorage();
//     return storage.read(key: 'auth_token');
//   }
// }

// ── Mock data (moved from schedule_view.dart) ─────────────────────────────────
const List<LectureModel> _mockSchedule = [
  // Saturday (0)
  LectureModel(
    id: '01',
    subject: 'Computer Architecture',
    room: 'Hall C',
    startTime: '09:00 AM',
    endTime: '11:00 AM',
    type: LectureType.lecture,
    weekday: 0,
    professor: 'Dr. Harrison',
  ),
  // Sunday (1)
  LectureModel(
    id: '11',
    subject: 'Advanced Calculus',
    room: 'Hall 4B',
    startTime: '08:30 AM',
    endTime: '10:00 AM',
    type: LectureType.lecture,
    weekday: 1,
    professor: 'Dr. Harrison',
  ),
  LectureModel(
    id: '12',
    subject: 'Physics Lab',
    room: 'Lab C-12',
    startTime: '10:30 AM',
    endTime: '12:30 PM',
    type: LectureType.section,
    weekday: 1,
    professor: 'Staff',
  ),
  // Monday (2)
  LectureModel(
    id: '21',
    subject: 'Database Systems',
    room: 'Lab 2',
    startTime: '10:30 AM',
    endTime: '12:30 PM',
    type: LectureType.lecture,
    weekday: 2,
    professor: 'Dr. Mosaad',
  ),
  LectureModel(
    id: '22',
    subject: 'Organic Chemistry Lab',
    room: 'Lab B',
    startTime: '01:00 PM',
    endTime: '03:00 PM',
    type: LectureType.section,
    weekday: 2,
    professor: 'Dr. Aris',
  ),
  LectureModel(
    id: '23',
    subject: 'Modern Literature',
    room: 'Hall C',
    startTime: '03:30 PM',
    endTime: '05:00 PM',
    type: LectureType.lecture,
    weekday: 2,
    professor: 'Prof. Blake',
  ),
  // Tuesday (3)
  LectureModel(
    id: '31',
    subject: 'Algorithms & Complexity',
    room: 'Hall A',
    startTime: '09:00 AM',
    endTime: '11:00 AM',
    type: LectureType.lecture,
    weekday: 3,
    professor: 'Dr. Selim',
  ),
  LectureModel(
    id: '32',
    subject: 'Algorithms Lab',
    room: 'Lab 4',
    startTime: '11:30 AM',
    endTime: '01:30 PM',
    type: LectureType.section,
    weekday: 3,
    professor: 'Dr. Selim',
  ),
  // Wednesday (4)
  LectureModel(
    id: '41',
    subject: 'Computer Networks',
    room: 'Hall B',
    startTime: '11:30 AM',
    endTime: '01:30 PM',
    type: LectureType.lecture,
    weekday: 4,
    professor: 'Prof. Ryan',
  ),
  // Thursday (5)
  LectureModel(
    id: '51',
    subject: 'Software Engineering',
    room: 'Hall D',
    startTime: '02:00 PM',
    endTime: '04:00 PM',
    type: LectureType.lecture,
    weekday: 5,
    professor: 'Dr. Amin',
  ),
];
