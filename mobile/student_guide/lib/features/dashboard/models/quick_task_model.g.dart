// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'quick_task_model.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class QuickTaskModelAdapter extends TypeAdapter<QuickTaskModel> {
  @override
  final int typeId = 0;

  @override
  QuickTaskModel read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return QuickTaskModel(
      id: fields[0] as String,
      title: fields[1] as String,
      isDone: fields[2] as bool,
    );
  }

  @override
  void write(BinaryWriter writer, QuickTaskModel obj) {
    writer
      ..writeByte(3)
      ..writeByte(0)
      ..write(obj.id)
      ..writeByte(1)
      ..write(obj.title)
      ..writeByte(2)
      ..write(obj.isDone);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is QuickTaskModelAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}
