import 'package:student_guide/features/gpa_calculator/models/subject_entry_model.dart';

class GpaState {
  final List<SubjectEntry> subjects;
  final double targetCgpa;
  final double currentCgpa;
  final double lastGpa;
  final int totalCredits;

  const GpaState({
    required this.subjects,
    required this.targetCgpa,
    required this.currentCgpa,
    required this.lastGpa,
    required this.totalCredits,
  });

  double get estimatedGpa {
    double totalPoints = 0;
    int credits = 0;
    for (final s in subjects) {
      if (s.grade != null && s.credits > 0) {
        totalPoints += s.grade! * s.credits;
        credits += s.credits;
      }
    }
    if (credits == 0) return 0.0;
    return totalPoints / credits;
  }

  String get strategyTip {
    final valid = subjects
        .where((s) => s.grade != null && s.credits > 0)
        .toList();
    if (valid.isEmpty) return 'Add subjects to get a strategy tip.';
    final best = valid.reduce((a, b) => a.credits > b.credits ? a : b);
    return "Focus on '${best.name}' (${best.credits} credits). Increasing that grade to A+ would boost your CGPA by an additional ${((4.0 - (best.grade ?? 0)) * best.credits / (totalCredits + best.credits)).toStringAsFixed(2)}.";
  }

  GpaState copyWith({
    List<SubjectEntry>? subjects,
    double? targetCgpa,
    double? currentCgpa,
    double? lastGpa,
    int? totalCredits,
  }) {
    return GpaState(
      subjects: subjects ?? this.subjects,
      targetCgpa: targetCgpa ?? this.targetCgpa,
      currentCgpa: currentCgpa ?? this.currentCgpa,
      lastGpa: lastGpa ?? this.lastGpa,
      totalCredits: totalCredits ?? this.totalCredits,
    );
  }
}
