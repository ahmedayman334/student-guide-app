// lib/features/gpa_calculator/views/widgets/subject_row.dart

import 'package:flutter/material.dart';
import 'package:student_guide/features/gpa_calculator/models/subject_entry_model.dart';
import 'package:student_guide/features/gpa_calculator/views/widgets/grade_option.dart';

class SubjectRow extends StatelessWidget {
  final SubjectEntry entry;
  final VoidCallback onDelete;
  final VoidCallback onChanged;

  const SubjectRow({
    super.key,
    required this.entry,
    required this.onDelete,
    required this.onChanged,
  });

  static const _fieldFill = Color(0xFFF3F4FF);
  static const _labelStyle = TextStyle(
    fontSize: 11,
    fontWeight: FontWeight.w600,
    color: Color(0xFF6B7280),
    letterSpacing: 0.8,
  );

  InputDecoration get _inputDecoration => InputDecoration(
        filled: true,
        fillColor: _fieldFill,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: BorderSide.none,
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: BorderSide.none,
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: const BorderSide(color: Color(0xFF4B6BFB), width: 1.5),
        ),
        contentPadding:
            const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
      );

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFFE5E7EB)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // ── Subject Name ───────────────────────────────
          const Text('SUBJECT NAME', style: _labelStyle),
          const SizedBox(height: 6),
          TextFormField(
            initialValue: entry.name.isEmpty ? null : entry.name,
            decoration: _inputDecoration.copyWith(
              hintText: 'Add subject name...',
            ),
            onChanged: (val) {
              entry.name = val;
              onChanged();
            },
          ),
          const SizedBox(height: 10),

          // ── Credits + Grade + Delete ───────────────────
          Row(
            children: [
              // Credits
              Expanded(
                flex: 2,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('CREDITS', style: _labelStyle),
                    const SizedBox(height: 6),
                    TextFormField(
                      initialValue: entry.credits == 0 ? '0' : '${entry.credits}',
                      keyboardType: TextInputType.number,
                      decoration: _inputDecoration,
                      onChanged: (val) {
                        entry.credits = int.tryParse(val) ?? 0;
                        onChanged();
                      },
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 8),

              // Grade
              Expanded(
                flex: 3,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('GRADE', style: _labelStyle),
                    const SizedBox(height: 6),
                    DropdownButtonFormField<double>(
                      initialValue: entry.grade,
                      hint: const Text('Select Grade',
                          style: TextStyle(fontSize: 13)),
                      icon: const Icon(Icons.keyboard_arrow_down_rounded,
                          size: 18),
                      decoration: _inputDecoration,
                      items: gradeOptions
                          .map((g) => DropdownMenuItem(
                                value: g.value,
                                child: Text(g.label,
                                    style: const TextStyle(fontSize: 13)),
                              ))
                          .toList(),
                      onChanged: (val) {
                        entry.grade = val;
                        onChanged();
                      },
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 8),

              // Delete
              Padding(
                padding: const EdgeInsets.only(top: 20),
                child: GestureDetector(
                  onTap: onDelete,
                  child: Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: const Color(0xFFFFE4E4),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: const Icon(Icons.delete_outline,
                        color: Color(0xFFDC2626), size: 18),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}