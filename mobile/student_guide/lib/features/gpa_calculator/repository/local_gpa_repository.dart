import 'package:hive/hive.dart';
import 'package:student_guide/features/gpa_calculator/models/gpa_snapshot_model.dart';
import 'package:student_guide/features/gpa_calculator/repository/gpa_repo.dart';

class LocalGpaRepository implements GpaRepository {
  static const _boxName = 'gpaBox';
  static const _key = 'snapshot';

  Future<Box<GpaSnapshotModel>> _openBox() => Hive.openBox<GpaSnapshotModel>(_boxName);

  @override
  Future<GpaSnapshotModel?> loadSnapshot() async {
    final box = await _openBox();
    return box.get(_key);
  }

  @override
  Future<void> saveSnapshot(GpaSnapshotModel snapshot) async {
    final box = await _openBox();
    await box.put(_key, snapshot);
  }
}