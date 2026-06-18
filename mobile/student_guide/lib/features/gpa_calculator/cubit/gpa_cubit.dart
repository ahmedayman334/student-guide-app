import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:student_guide/features/gpa_calculator/models/gpa_snapshot_model.dart';
import 'package:student_guide/features/gpa_calculator/models/subject_entry_model.dart';
import 'package:student_guide/features/gpa_calculator/repository/gpa_repo.dart';

import 'gpa_state.dart';

class GpaCubit extends Cubit<GpaState> {
  final GpaRepository _repo;

  GpaCubit(this._repo)
    : super(
        GpaState(
          subjects: [SubjectEntry()],
          targetCgpa: 3.50,
          currentCgpa: 0.0,
          lastGpa: 0.0,
          totalCredits: 0,
        ),
      ) {
    _load();
  }

  Future<void> _load() async {
    final snapshot = await _repo.loadSnapshot();
    if (snapshot != null) {
      emit(state.copyWith(
        subjects: snapshot.subjects,
        targetCgpa: snapshot.targetCgpa,
        currentCgpa: snapshot.currentCgpa,
        lastGpa: snapshot.lastGpa,
        totalCredits: snapshot.totalCredits,
      ));
    }
  }

  void _persist() {
    _repo.saveSnapshot(GpaSnapshotModel(
      subjects: state.subjects,
      targetCgpa: state.targetCgpa,
      currentCgpa: state.currentCgpa,
      lastGpa: state.lastGpa,
      totalCredits: state.totalCredits,
    ));
  }

  void addSubject() {
    emit(state.copyWith(subjects: [...state.subjects, SubjectEntry()]));
    _persist();
  }

  void deleteSubject(int index) {
    emit(state.copyWith(subjects: [...state.subjects]..removeAt(index)));
    _persist();
  }

  void updateSubject() {
    emit(state.copyWith(subjects: [...state.subjects]));
    _persist();
  }

  void setTargetCgpa(double value) {
    emit(state.copyWith(targetCgpa: value));
    _persist();
  }

  void updateCurrentCgpa(double value) {
    emit(state.copyWith(currentCgpa: value));
    _persist();
  }

  void updateTotalCredits(int value) {
    emit(state.copyWith(totalCredits: value));
    _persist();
  }

  void updateLastGpa(double value) {
    emit(state.copyWith(lastGpa: value));
    _persist();
  }
}