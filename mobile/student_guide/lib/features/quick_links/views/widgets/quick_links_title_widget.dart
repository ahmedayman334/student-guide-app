import 'package:flutter/material.dart';
import 'package:student_guide/core/theming/app_colors.dart';
import 'package:student_guide/core/theming/app_text_style.dart';

class QuickLinksTitle extends StatelessWidget {
  const QuickLinksTitle({super.key});

  @override
  Widget build(BuildContext context) {
    return RichText(
      text: TextSpan(
        children: [
          TextSpan(
            text: 'Quick',
            style: AppTextStyles.displayTitle.copyWith(
              fontWeight: FontWeight.bold,
              color: AppColors.textPrimary,
              fontSize: 32,
            ),
          ),
          TextSpan(
            text: ' Links',
            style: AppTextStyles.displayTitle.copyWith(
              fontWeight: FontWeight.bold,
              fontSize: 32,
              foreground: Paint()
                ..shader = LinearGradient(
                  colors: [Color(0xFF010D5C), Color(0xFF6B7BD4)],
                  begin: Alignment.centerLeft,
                  end: Alignment.centerRight,
                ).createShader(const Rect.fromLTWH(0, 0, 150, 50)),
            ),
          ),
        ],
      ),
    );
  }
}
