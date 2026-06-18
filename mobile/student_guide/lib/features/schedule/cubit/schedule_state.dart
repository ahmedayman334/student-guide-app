part of 'schedule_cubit.dart';

class ScheduleState extends Equatable {
  final List<LectureModel> lectures;
  final int selectedIndex; // 0=Sat … 6=Fri
  final List<DateTime> weekDays;

  const ScheduleState({
    this.lectures = const [],
    required this.selectedIndex,
    required this.weekDays,
  });

  factory ScheduleState.initial() {
    final now = DateTime.now();
    final saturday = now.subtract(Duration(days: (now.weekday + 1) % 7));
    final weekDays = List.generate(7, (i) => saturday.add(Duration(days: i)));
    final selectedIndex = (now.weekday + 1) % 7;
    return ScheduleState(weekDays: weekDays, selectedIndex: selectedIndex);
  }

  ScheduleState copyWith({
    List<LectureModel>? lectures,
    int? selectedIndex,
    List<DateTime>? weekDays,
  }) {
    return ScheduleState(
      lectures: lectures ?? this.lectures,
      selectedIndex: selectedIndex ?? this.selectedIndex,
      weekDays: weekDays ?? this.weekDays,
    );
  }

  List<LectureModel> get todayLectures {
    final today = lectures.where((l) => l.weekday == selectedIndex).toList();
    today.sort((a, b) => _minutesSinceMidnight(a.startTime)
        .compareTo(_minutesSinceMidnight(b.startTime)));
    return today;
  }

  static int _minutesSinceMidnight(String time) {
    final parts = time.split(' ');
    final hm = parts[0].split(':');
    var hour = int.parse(hm[0]) % 12;
    if (parts[1].toUpperCase() == 'PM') hour += 12;
    return hour * 60 + int.parse(hm[1]);
  }

  @override
  List<Object?> get props => [lectures, selectedIndex, weekDays];
}