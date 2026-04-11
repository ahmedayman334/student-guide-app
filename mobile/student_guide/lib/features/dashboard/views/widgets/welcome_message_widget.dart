import 'package:flutter/widgets.dart';
import 'package:student_guide/core/theming/app_text_style.dart';

class WelcomeMessage extends StatelessWidget {
  final String name;
  const WelcomeMessage({super.key, required this.name});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text("welcome back, $name! 👋", style: AppTextStyles.welcomeTitle),
          Text(
            "Here's what's happening with your academic schedule today.",
            style: AppTextStyles.welcomeSubtitle,
          ),
        ],
      ),
    );
  }
}
