// lib/features/schedule/views/widgets/add_lecture_form.dart

import 'package:flutter/material.dart';
import 'package:student_guide/core/theming/app_colors.dart';
import 'package:student_guide/core/theming/app_text_style.dart';
import 'package:student_guide/features/schedule/views/widgets/lecture_type_enum.dart';
import 'package:student_guide/features/schedule/views/widgets/lecture_type_toggle.dart';

class AddLectureForm extends StatefulWidget {
  const AddLectureForm({super.key});

  @override
  State<AddLectureForm> createState() => _AddLectureFormState();
}

class _AddLectureFormState extends State<AddLectureForm> {
  LectureType _lectureType = LectureType.lecture;
  String _selectedDay = 'Monday';
  final TextEditingController _timeController = TextEditingController();

  final List<String> _days = [
    'Saturday', 'Sunday', 'Monday', 'Tuesday',
    'Wednesday', 'Thursday', 'Friday',
  ];

  static const _fieldFill = Color(0xFFEEF0FF);
  static const _labelStyle = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.bold,
    color: Color(0xFF6B7280),
  );

  InputDecoration get _inputDecoration => InputDecoration(
    filled: true,
    fillColor: _fieldFill,
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(10),
      borderSide: BorderSide.none,
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(10),
      borderSide: BorderSide.none,
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(10),
      borderSide: BorderSide(color: AppColors.primary, width: 1.5),
    ),
    contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
  );

  @override
  void dispose() {
    _timeController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // ── Header ──────────────────────────────────────
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(6),
                decoration: BoxDecoration(
                  color: AppColors.primary.withValues(alpha: 0.12),
                  shape: BoxShape.circle,
                ),
                child: Icon(Icons.add, color: AppColors.primary, size: 18),
              ),
              const SizedBox(width: 10),
              Text('Add New Lecture', style: AppTextStyles.heading2),
            ],
          ),
          const SizedBox(height: 20),

          // ── Subject Name ─────────────────────────────────
          const Text('Subject Name', style: _labelStyle),
          const SizedBox(height: 6),
          TextFormField(
            decoration: _inputDecoration.copyWith(hintText: 'e.g. Quantum Physics'),
          ),
          const SizedBox(height: 14),

          // ── Lecture Hall ─────────────────────────────────
          const Text('Lecture Hall', style: _labelStyle),
          const SizedBox(height: 6),
          TextFormField(
            decoration: _inputDecoration.copyWith(hintText: 'e.g. Hall C-12'),
          ),
          const SizedBox(height: 14),

          // ── Day of Week ──────────────────────────────────
          const Text('Day of Week', style: _labelStyle),
          const SizedBox(height: 6),
          DropdownButtonFormField<String>(
            initialValue: _selectedDay,
            icon: const Icon(Icons.keyboard_arrow_down_rounded),
            decoration: _inputDecoration,
            items: _days
                .map((d) => DropdownMenuItem(value: d, child: Text(d)))
                .toList(),
            onChanged: (val) => setState(() => _selectedDay = val!),
          ),
          const SizedBox(height: 14),

          // ── Time Slot ────────────────────────────────────
          const Text('Time Slot', style: _labelStyle),
          const SizedBox(height: 6),
          TextFormField(
            readOnly: true,
            controller: _timeController,
            decoration: _inputDecoration.copyWith(
              hintText: '--:-- --',
              suffixIcon: const Icon(
                Icons.access_time_rounded,
                color: Color(0xFF9CA3AF),
                size: 20,
              ),
            ),
            onTap: () async {
              final picked = await showTimePicker(
                context: context,
                initialTime: TimeOfDay.now(),
              );
              if (picked != null && mounted) {
                // ignore: use_build_context_synchronously
                _timeController.text = picked.format(context);
              }
            },
          ),
          const SizedBox(height: 14),

          // ── Type Toggle ──────────────────────────────────
          const Text('Type', style: _labelStyle),
          const SizedBox(height: 6),
          LectureTypeToggle(
            selected: _lectureType,
            onChanged: (type) => setState(() => _lectureType = type),
          ),
          const SizedBox(height: 24),

          // ── Submit Button ────────────────────────────────
          SizedBox(
            width: double.infinity,
            height: 50,
            child: DecoratedBox(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [AppColors.primary, AppColors.primary.withBlue(220)],
                ),
                borderRadius: BorderRadius.circular(12),
              ),
              child: ElevatedButton(
                onPressed: () {},
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.transparent,
                  shadowColor: Colors.transparent,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                child: const Text(
                  'Add to Schedule',
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w600,
                    color: Colors.white,
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}