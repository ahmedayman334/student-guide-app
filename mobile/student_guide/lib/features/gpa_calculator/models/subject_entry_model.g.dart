// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'subject_entry_model.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class SubjectEntryAdapter extends TypeAdapter<SubjectEntry> {
  @override
  final int typeId = 1;

  @override
  SubjectEntry read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return SubjectEntry(
      name: fields[0] as String,
      credits: fields[1] as int,
      grade: fields[2] as double?,
    );
  }

  @override
  void write(BinaryWriter writer, SubjectEntry obj) {
    writer
      ..writeByte(3)
      ..writeByte(0)
      ..write(obj.name)
      ..writeByte(1)
      ..write(obj.credits)
      ..writeByte(2)
      ..write(obj.grade);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is SubjectEntryAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}
