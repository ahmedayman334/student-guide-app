import 'package:flutter/material.dart';
import 'package:student_guide/core/theming/app_colors.dart';
import 'package:student_guide/core/theming/app_text_style.dart';

class WelcomeMessage extends StatelessWidget {
  final String name;
  final int classCount;
  const WelcomeMessage({
    super.key,
    required this.name,
    required this.classCount,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          RichText(
            text: TextSpan(
              children: [
                TextSpan(
                  text: "welcome back, ",
                  style: AppTextStyles.displayTitle.copyWith(
                    color: AppColors.textPrimary,
                  ),
                ),
                TextSpan(
                  text: name,
                  style: AppTextStyles.displayTitle.copyWith(
                    color: AppColors.primary,
                  ),
                ),
              ],
            ),
          ),

          SizedBox(height: 6),
          Text(
            "You have $classCount classes today. Stay focused!",
            style: AppTextStyles.subtitle.copyWith(
              color: AppColors.textSecondary,
            ),
          ),
        ],
      ),
    );
  }
}
