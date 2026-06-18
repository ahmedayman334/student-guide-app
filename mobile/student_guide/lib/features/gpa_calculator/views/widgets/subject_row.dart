import 'package:flutter/material.dart';
import 'package:student_guide/core/theming/app_colors.dart';
import 'package:student_guide/core/theming/app_text_style.dart';
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
        contentPadding:
            const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
      );

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: theme.dividerTheme.color ?? AppColors.divider),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // ── Subject Name ───────────────────────────────
          Text('SUBJECT NAME',
              style: AppTextStyles.sectionLabel
                  .copyWith(color: theme.textTheme.bodySmall?.color)),
          const SizedBox(height: 6),
          TextFormField(
            initialValue: entry.name.isEmpty ? null : entry.name,
            style: AppTextStyles.inputValue
                .copyWith(color: theme.textTheme.bodyMedium?.color),
            decoration: _inputDecoration(context).copyWith(
              hintText: 'Add subject name...',
              hintStyle: AppTextStyles.inputHint
                  .copyWith(color: theme.hintColor),
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
              Expanded(
                flex: 2,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('CREDITS',
                        style: AppTextStyles.sectionLabel
                            .copyWith(color: theme.textTheme.bodySmall?.color)),
                    const SizedBox(height: 6),
                    TextFormField(
                      initialValue: entry.credits == 0
                          ? '0'
                          : '${entry.credits}',
                      keyboardType: TextInputType.number,
                      style: AppTextStyles.inputValue
                          .copyWith(color: theme.textTheme.bodyMedium?.color),
                      decoration: _inputDecoration(context),
                      onChanged: (val) {
                        entry.credits = int.tryParse(val) ?? 0;
                        onChanged();
                      },
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                flex: 3,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('GRADE',
                        style: AppTextStyles.sectionLabel
                            .copyWith(color: theme.textTheme.bodySmall?.color)),
                    const SizedBox(height: 6),
                    DropdownButtonFormField<double>(
                      initialValue: entry.grade,
                      hint: Text('Select Grade',
                          style: AppTextStyles.inputHint
                              .copyWith(color: theme.hintColor)),
                      icon: const Icon(Icons.keyboard_arrow_down_rounded,
                          size: 18),
                      decoration: _inputDecoration(context),
                      items: gradeOptions
                          .map((g) => DropdownMenuItem(
                                value: g.value,
                                child: Text(g.label,
                                    style: AppTextStyles.inputValue.copyWith(
                                        color: theme.textTheme.bodyMedium?.color)),
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
              Padding(
                padding: const EdgeInsets.only(top: 20),
                child: GestureDetector(
                  onTap: onDelete,
                  child: Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: AppColors.error.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Icon(Icons.delete_outline,
                        color: AppColors.error, size: 18),
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