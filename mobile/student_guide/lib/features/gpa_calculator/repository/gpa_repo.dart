import 'package:student_guide/features/gpa_calculator/models/gpa_snapshot_model.dart';

abstract class GpaRepository {
  Future<GpaSnapshotModel?> loadSnapshot();
  Future<void> saveSnapshot(GpaSnapshotModel snapshot);
}