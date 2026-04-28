// lib/features/schedule/views/widgets/lecture_type_toggle.dart

import 'package:flutter/material.dart';
import 'package:student_guide/core/theming/app_colors.dart';
import 'package:student_guide/features/schedule/views/widgets/lecture_type_enum.dart';

class LectureTypeToggle extends StatelessWidget {
  final LectureType selected;
  final ValueChanged<LectureType> onChanged;

  const LectureTypeToggle({
    super.key,
    required this.selected,
    required this.onChanged,
  });

  static const _fieldFill = Color(0xFFEEF0FF);

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: _fieldFill,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        children: LectureType.values.map((type) {
          final isSelected = selected == type;
          final label = type == LectureType.lecture ? 'Lecture' : 'Section';
          return Expanded(
            child: GestureDetector(
              onTap: () => onChanged(type),
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                padding: const EdgeInsets.symmetric(vertical: 12),
                decoration: BoxDecoration(
                  color: isSelected ? AppColors.primary : Colors.transparent,
                  borderRadius: BorderRadius.circular(10),
                ),
                alignment: Alignment.center,
                child: Text(
                  label,
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                    color: isSelected ? Colors.white : const Color(0xFF6B7280),
                  ),
                ),
              ),
            ),
          );
        }).toList(),
      ),
    );
  }
}