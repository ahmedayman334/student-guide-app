import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:student_guide/features/gpa_calculator/models/subject_entry_model.dart';

import 'gpa_state.dart';

class GpaCubit extends Cubit<GpaState> {
  GpaCubit()
    : super(
        GpaState(
          subjects: [SubjectEntry()], // one empty row
          targetCgpa: 3.50,
          currentCgpa: 0.0,
          lastGpa: 0.0,
          totalCredits: 0,
        ),
      );

  void addSubject() {
    final updated = [...state.subjects, SubjectEntry()];
    emit(state.copyWith(subjects: updated));
  }

  void deleteSubject(int index) {
    final updated = [...state.subjects]..removeAt(index);
    emit(state.copyWith(subjects: updated));
  }

  void updateSubject() {
    emit(state.copyWith(subjects: [...state.subjects]));
  }

  void setTargetCgpa(double value) {
    emit(state.copyWith(targetCgpa: value));
  }

  void updateCurrentCgpa(double value) {
    emit(state.copyWith(currentCgpa: value));
  }

  void updateTotalCredits(int value) {
    emit(state.copyWith(totalCredits: value));
  }

  void updateLastGpa(double value) {
    emit(state.copyWith(lastGpa: value));
  }
}
