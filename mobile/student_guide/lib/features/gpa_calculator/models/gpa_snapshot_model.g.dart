// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'gpa_snapshot_model.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class GpaSnapshotModelAdapter extends TypeAdapter<GpaSnapshotModel> {
  @override
  final int typeId = 2;

  @override
  GpaSnapshotModel read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return GpaSnapshotModel(
      subjects: (fields[0] as List).cast<SubjectEntry>(),
      targetCgpa: fields[1] as double,
      currentCgpa: fields[2] as double,
      lastGpa: fields[3] as double,
      totalCredits: fields[4] as int,
    );
  }

  @override
  void write(BinaryWriter writer, GpaSnapshotModel obj) {
    writer
      ..writeByte(5)
      ..writeByte(0)
      ..write(obj.subjects)
      ..writeByte(1)
      ..write(obj.targetCgpa)
      ..writeByte(2)
      ..write(obj.currentCgpa)
      ..writeByte(3)
      ..write(obj.lastGpa)
      ..writeByte(4)
      ..write(obj.totalCredits);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is GpaSnapshotModelAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}
