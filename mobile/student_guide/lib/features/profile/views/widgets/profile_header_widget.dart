// lib/features/profile/views/widgets/profile_header_widget.dart
import 'package:flutter/material.dart';
import 'package:student_guide/core/theming/app_text_style.dart';

import '../../../../core/theming/app_colors.dart';

class ProfileHeaderWidget extends StatelessWidget {
  final String name;
  final String subtitle; // e.g. "B.Sc. Computer Science • 3rd Year"
  final String initials; // e.g. "JD"

  const ProfileHeaderWidget({
    super.key,
    required this.name,
    required this.subtitle,
    required this.initials,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Stack(
          clipBehavior: Clip.none,
          children: [
            // Gradient banner
            Container(
              height: 110,
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  colors: [Color(0xFF6B7FD4), Color(0xFF5BC4C0)],
                  begin: Alignment.centerLeft,
                  end: Alignment.centerRight,
                ),
                borderRadius: BorderRadius.all(Radius.circular(16)),
              ),
            ),
            // Avatar
            Positioned(
              bottom: -30,
              left: 16,
              child: Stack(
                children: [
                  CircleAvatar(
                    radius: 38,
                    backgroundColor: Colors.white,
                    child: CircleAvatar(
                      radius: 34,
                      backgroundColor: const Color(0xFF6B7FD4),
                      child: Text(
                        initials,
                        style: AppTextStyles.heading2.copyWith(
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ),
                  // Edit badge
                  Positioned(
                    bottom: 0,
                    right: 0,
                    child: CircleAvatar(
                      radius: 11,
                      backgroundColor: AppColors.primary, // your teal/green
                      child: const Icon(
                        Icons.edit,
                        size: 12,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
        const SizedBox(height: 38),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 4),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(name, style: AppTextStyles.heading1),
              const SizedBox(height: 2),
              Text(
                subtitle,
                style: AppTextStyles.bodySmall.copyWith(
                  color: AppColors.textSecondary,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
