import 'package:flutter/material.dart';
import 'package:student_guide/core/theming/app_colors.dart';
import 'package:student_guide/core/theming/app_text_style.dart';

class AcademicHistoryCard extends StatelessWidget {
  final double currentCgpa;
  final int totalCredits;
  final double lastGpa;
  final ValueChanged<double> onCgpaChanged;
  final ValueChanged<int> onCreditsChanged;
  final ValueChanged<double> onLastGpaChanged;

  const AcademicHistoryCard({
    super.key,
    required this.currentCgpa,
    required this.totalCredits,
    required this.lastGpa,
    required this.onCgpaChanged,
    required this.onCreditsChanged,
    required this.onLastGpaChanged,
  });

  InputDecoration _inputDecoration(BuildContext context) => InputDecoration(
    filled: true,
    fillColor: Theme.of(context).inputDecorationTheme.fillColor ?? AppColors.surfaceGrey,
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
      borderSide: BorderSide(color: Theme.of(context).colorScheme.primary, width: 1.5),
    ),
    contentPadding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
  );

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.surface,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.04),
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.history_edu, color: Theme.of(context).colorScheme.primary, size: 20),
              const SizedBox(width: 8),
              Text(
                'Academic History',
                style: AppTextStyles.heading3.copyWith(
                  color: Theme.of(context).textTheme.bodyMedium?.color,
                ),
              ),
            ],
          ),
          const SizedBox(height: 4),
          Text(
            'Enter your current academic standing.',
            style: AppTextStyles.bodySmall.copyWith(
              color: Theme.of(context).textTheme.bodySmall?.color,
            ),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              // Current CGPA
              Expanded(
                child: _HistoryField(
                  label: 'CURRENT CGPA',
                  initialValue: currentCgpa > 0
                      ? currentCgpa.toStringAsFixed(2)
                      : '',
                  hint: '0.00',
                  inputDecoration: _inputDecoration(context),
                  onChanged: (val) =>
                      onCgpaChanged(double.tryParse(val) ?? 0.0),
                ),
              ),
              const SizedBox(width: 10),
              // Total Credits
              Expanded(
                child: _HistoryField(
                  label: 'TOTAL CREDITS',
                  initialValue: totalCredits > 0 ? '$totalCredits' : '',
                  hint: '0',
                  inputDecoration: _inputDecoration(context),
                  keyboardType: TextInputType.number,
                  onChanged: (val) => onCreditsChanged(int.tryParse(val) ?? 0),
                ),
              ),
              const SizedBox(width: 10),
              // Last Semester GPA
              Expanded(
                child: _HistoryField(
                  label: 'LAST SEM GPA',
                  initialValue: lastGpa > 0 ? lastGpa.toStringAsFixed(2) : '',
                  hint: 'optional',
                  inputDecoration: _inputDecoration(context),
                  onChanged: (val) =>
                      onLastGpaChanged(double.tryParse(val) ?? 0.0),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _HistoryField extends StatelessWidget {
  final String label;
  final String initialValue;
  final String hint;
  final InputDecoration inputDecoration;
  final TextInputType keyboardType;
  final ValueChanged<String> onChanged;

  const _HistoryField({
    required this.label,
    required this.initialValue,
    required this.hint,
    required this.inputDecoration,
    required this.onChanged,
    this.keyboardType = TextInputType.number,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: AppTextStyles.sectionLabel.copyWith(
            color: Theme.of(context).textTheme.bodySmall?.color,
          ),
        ),
        const SizedBox(height: 6),
        TextFormField(
          initialValue: initialValue,
          keyboardType: keyboardType,
          style: AppTextStyles.inputValue.copyWith(
            color: Theme.of(context).textTheme.bodyMedium?.color,
          ),
          decoration: inputDecoration.copyWith(
            hintText: hint,
            hintStyle: AppTextStyles.inputHint.copyWith(
              color: Theme.of(context).hintColor,
            ),
          ),
          onChanged: onChanged,
        ),
      ],
    );
  }
}
