// lib/features/profile/views/widgets/personal_info_card.dart
import 'package:flutter/material.dart';
import 'package:student_guide/core/theming/app_text_style.dart';

import '../../../../core/theming/app_colors.dart';

class PersonalInfoCard extends StatefulWidget {
  const PersonalInfoCard({super.key});

  @override
  State<PersonalInfoCard> createState() => _PersonalInfoCardState();
}

class _PersonalInfoCardState extends State<PersonalInfoCard> {
  final _nameController = TextEditingController(text: 'Johnathan Doe');
  final _idController = TextEditingController(text: 'ST-9982441');
  final _emailController = TextEditingController(
    text: 'john.doe@university.edu',
  );
  String _department = 'Computer Science';
  String _year = '3rd Year';

  final _departments = ['Computer Science', 'Engineering', 'Business', 'Arts'];
  final _years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(color: Colors.black.withValues(alpha: 0.05), blurRadius: 8),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Personal Information',
                      style: AppTextStyles.heading3.copyWith(
                        fontWeight: FontWeight.bold,
                        color: theme.textTheme.bodyMedium?.color,
                      ),
                    ),
                    Text(
                      'Update your university profile details',
                      style: AppTextStyles.bodySmall.copyWith(
                        color: theme.textTheme.bodySmall?.color,
                      ),
                    ),
                  ],
                ),
              ),
              ElevatedButton(
                onPressed: () {},
                style: ElevatedButton.styleFrom(
                  backgroundColor: theme.colorScheme.primary,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  padding: const EdgeInsets.symmetric(
                    horizontal: 14,
                    vertical: 10,
                  ),
                ),
                child: Text(
                  'Save\nChanges',
                  style: AppTextStyles.inputLabel.copyWith(color: Colors.white),
                  textAlign: TextAlign.center,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          _FieldLabel('Full Name'),
          _InputField(controller: _nameController, icon: Icons.person_outline),
          const SizedBox(height: 12),
          _FieldLabel('University ID'),
          _InputField(
            controller: _idController,
            icon: Icons.badge_outlined,
            readOnly: true,
          ),
          const SizedBox(height: 12),
          _FieldLabel('Academic Email'),
          _InputField(controller: _emailController, icon: Icons.email_outlined),
          const SizedBox(height: 12),
          _FieldLabel('Department'),
          _DropdownField(
            value: _department,
            items: _departments,
            icon: Icons.account_balance_outlined,
            onChanged: (v) => setState(() => _department = v!),
          ),
          const SizedBox(height: 12),
          _FieldLabel('Academic Year'),
          _DropdownField(
            value: _year,
            items: _years,
            icon: Icons.calendar_today_outlined,
            onChanged: (v) => setState(() => _year = v!),
          ),
        ],
      ),
    );
  }
}

class _FieldLabel extends StatelessWidget {
  final String text;
  const _FieldLabel(this.text);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 6),
      child: Text(
        text,
        style: AppTextStyles.inputLabel.copyWith(
          color: Theme.of(context).textTheme.bodySmall?.color,
        ),
      ),
    );
  }
}

class _InputField extends StatelessWidget {
  final TextEditingController controller;
  final IconData icon;
  final bool readOnly;

  const _InputField({
    required this.controller,
    required this.icon,
    this.readOnly = false,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    return TextField(
      controller: controller,
      readOnly: readOnly,
      style: AppTextStyles.bodyMedium.copyWith(color: theme.textTheme.bodyMedium?.color),
      decoration: InputDecoration(
        prefixIcon: Icon(icon, size: 18, color: theme.textTheme.bodySmall?.color),
        filled: true,
        fillColor: theme.inputDecorationTheme.fillColor ?? (isDark ? AppColors.darkSurfaceGrey : Colors.grey.shade100),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide.none,
        ),
        contentPadding: const EdgeInsets.symmetric(
          vertical: 14,
          horizontal: 12,
        ),
      ),
    );
  }
}

class _DropdownField extends StatelessWidget {
  final String value;
  final List<String> items;
  final IconData icon;
  final ValueChanged<String?> onChanged;

  const _DropdownField({
    required this.value,
    required this.items,
    required this.icon,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12),
      decoration: BoxDecoration(
        color: theme.inputDecorationTheme.fillColor ?? (isDark ? AppColors.darkSurfaceGrey : Colors.grey.shade100),
        borderRadius: BorderRadius.circular(12),
      ),
      child: DropdownButtonHideUnderline(
        child: DropdownButton<String>(
          value: value,
          isExpanded: true,
          dropdownColor: theme.colorScheme.surface,
          icon: const Icon(Icons.expand_more),
          items: items
              .map(
                (e) => DropdownMenuItem(
                  value: e,
                  child: Row(
                    children: [
                      Icon(icon, size: 18, color: theme.textTheme.bodySmall?.color),
                      const SizedBox(width: 10),
                      Text(e, style: AppTextStyles.bodyMedium.copyWith(color: theme.textTheme.bodyMedium?.color)),
                    ],
                  ),
                ),
              )
              .toList(),
          onChanged: onChanged,
        ),
      ),
    );
  }
}
