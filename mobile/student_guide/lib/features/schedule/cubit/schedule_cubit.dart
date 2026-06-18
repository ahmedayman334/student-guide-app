import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:student_guide/features/schedule/models/lecture_model.dart';
import 'package:student_guide/features/schedule/views/widgets/lecture_type_enum.dart';

part 'schedule_state.dart';

// Phase 3 placeholder — Phase 4 replaces this with an async repository fetch.
const List<LectureModel> _mockLectures = [
  LectureModel(
    id: '01',
    subject: 'Computer Architecture',
    room: 'Hall C',
    startTime: '09:00 AM',
    endTime: '11:00 AM',
    type: LectureType.lecture,
    weekday: 0,
  ),
  LectureModel(
    id: '11',
    subject: 'Advanced Calculus',
    room: 'Hall 4B',
    startTime: '08:30 AM',
    endTime: '10:00 AM',
    type: LectureType.lecture,
    weekday: 1,
  ),
  LectureModel(
    id: '12',
    subject: 'Physics Lab',
    room: 'Lab C-12',
    startTime: '10:30 AM',
    endTime: '12:30 PM',
    type: LectureType.section,
    weekday: 1,
  ),
  LectureModel(
    id: '21',
    subject: 'Database Systems',
    room: 'Lab 2',
    startTime: '10:30 AM',
    endTime: '12:30 PM',
    type: LectureType.lecture,
    weekday: 2,
  ),
  LectureModel(
    id: '22',
    subject: 'Organic Chemistry Lab',
    room: 'Lab B',
    startTime: '01:00 PM',
    endTime: '03:00 PM',
    type: LectureType.section,
    weekday: 2,
  ),
  LectureModel(
    id: '23',
    subject: 'Modern Literature',
    room: 'Hall C',
    startTime: '03:30 PM',
    endTime: '05:00 PM',
    type: LectureType.lecture,
    weekday: 2,
  ),
  LectureModel(
    id: '31',
    subject: 'Algorithms & Complexity',
    room: 'Hall A',
    startTime: '09:00 AM',
    endTime: '11:00 AM',
    type: LectureType.lecture,
    weekday: 3,
  ),
  LectureModel(
    id: '32',
    subject: 'Algorithms Lab',
    room: 'Lab 4',
    startTime: '11:30 AM',
    endTime: '01:30 PM',
    type: LectureType.section,
    weekday: 3,
  ),
  LectureModel(
    id: '41',
    subject: 'Computer Networks',
    room: 'Hall B',
    startTime: '11:30 AM',
    endTime: '01:30 PM',
    type: LectureType.lecture,
    weekday: 4,
  ),
  LectureModel(
    id: '51',
    subject: 'Software Engineering',
    room: 'Hall D',
    startTime: '02:00 PM',
    endTime: '04:00 PM',
    type: LectureType.lecture,
    weekday: 4,
  ),
];

class ScheduleCubit extends Cubit<ScheduleState> {
  ScheduleCubit() : super(ScheduleState.initial()) {
    loadLectures(_mockLectures);
  }

  void selectDay(int index) => emit(state.copyWith(selectedIndex: index));

  // Phase 4: swap loadLectures(_mockLectures) above for an async repo fetch.
  void loadLectures(List<LectureModel> lectures) =>
      emit(state.copyWith(lectures: lectures));
}
