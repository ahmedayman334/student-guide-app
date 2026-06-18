import 'package:flutter/material.dart';
import 'package:student_guide/core/theming/app_text_style.dart'
    show AppTextStyles;

class AcademicHeader extends StatelessWidget {
  const AcademicHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        RichText(
          text: TextSpan(
            style: const TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.bold,
              height: 1.2,
            ),
            children: [
              TextSpan(
                text: 'Academic\n',
                style: AppTextStyles.displayTitle.copyWith(
                  color: Theme.of(context).textTheme.bodyMedium?.color,
                ),
              ),
              TextSpan(
                text: 'Dapartments',
                style: AppTextStyles.displayTitle.copyWith(
                  fontWeight: FontWeight.bold,
                  fontSize: 32,
                  foreground: Paint()
                    ..shader = LinearGradient(
                      colors: [
                        Color.fromARGB(255, 75, 94, 218),
                        Color.fromARGB(255, 128, 142, 221),
                      ],
                      begin: Alignment.centerLeft,
                      end: Alignment.centerRight,
                    ).createShader(const Rect.fromLTWH(0, 0, 150, 50)),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 8),
        Text(
          'Explore specialized faculties and discover over 450 subjects curated for your academic journey.',
          style: TextStyle(fontSize: 13, color: Theme.of(context).textTheme.bodySmall?.color, height: 1.5),
        ),
      ],
    );
  }
}
