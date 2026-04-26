// import 'package:flutter/material.dart';
// import 'package:student_guide/core/theming/app_colors.dart';
// import 'package:student_guide/core/theming/app_text_style.dart';

// class BoostGpaBanner extends StatelessWidget {
//   const BoostGpaBanner({super.key});

//   @override
//   Widget build(BuildContext context) {
//     return Container(
//       margin: const EdgeInsets.all(20),
//       padding: const EdgeInsets.all(20),
//       height: 300,
//       decoration: BoxDecoration(
//         borderRadius: BorderRadius.circular(12),
//         gradient: LinearGradient(
//           colors: [AppColors.accent, const Color.fromARGB(255, 125, 142, 235)],
//         ),
//       ),

//       child: Column(
//         children: [
//           Text(
//             "Boost your GPA!",
//             style: AppTextStyles.heading1.copyWith(color: Colors.white),
//           ),
//           const SizedBox(height: 8),
//           Text(
//             "Join the 'Advanced Study Techniques' workshop this weekend and get ahead of the curve.",

//             style: AppTextStyles.bodyMedium.copyWith(color: Colors.white70),
//             textAlign: TextAlign.center,
//           ),
//           const SizedBox(height: 16),
//           OutlinedButton(
//             onPressed: () {},
//             style: OutlinedButton.styleFrom(
//               foregroundColor: AppColors.accent,
//               backgroundColor: AppColors.background,
//               side: BorderSide(color: AppColors.background),
//               shape: RoundedRectangleBorder(
//                 borderRadius: BorderRadius.circular(24),
//               ),
//               textStyle: AppTextStyles.subtitle.copyWith(
//                 color: AppColors.accent,
//                 // fontWeight: FontWeight.bold,
//               ),
//             ),
//             child: const Text(
//               "Register Now",
//               style: TextStyle(fontWeight: FontWeight.bold),
//             ),
//           ),
//           const SizedBox(height: 16),

//           Align(
//             alignment: Alignment.center,
//             child: Container(
//               padding: const EdgeInsets.all(16),
//               decoration: BoxDecoration(
//                 color: Colors.white.withValues(alpha: 0.15),
//                 borderRadius: BorderRadius.circular(12),
//               ),
//               child: const Icon(Icons.star, color: Colors.white, size: 40),
//             ),
//           ),
//         ],
//       ),
//     );
//   }
// }

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:student_guide/core/routing/app_routes.dart';
import 'package:student_guide/core/theming/app_colors.dart';
import 'package:student_guide/core/theming/app_text_style.dart';

class BoostGpaBanner extends StatelessWidget {
  const BoostGpaBanner({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(24),
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFF4B5CC4), Color.fromARGB(255, 139, 152, 242)],
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Text(
            "Boost your GPA!",
            style: AppTextStyles.heading1.copyWith(
              color: Colors.white,
              fontWeight: FontWeight.w800,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 10),
          Text(
            "Join the 'Advanced Study Techniques' workshop this weekend and get ahead of the curve.",
            style: AppTextStyles.bodyMedium.copyWith(
              fontSize: 18,
              color: Colors.white.withValues(alpha: 0.9),
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 20),
          OutlinedButton(
            onPressed: () => context.push(AppRoutes.register),
            style: OutlinedButton.styleFrom(
              backgroundColor: Colors.white,
              foregroundColor: AppColors.primary,
              side: BorderSide.none,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(30),
              ),
              padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 12),
              textStyle: AppTextStyles.bodyMedium.copyWith(
                fontSize: 18,
                fontWeight: FontWeight.w900,
              ),
            ),
            child: const Text("Register Now"),
          ),
          const SizedBox(height: 20),
          Transform.rotate(
            angle: 0.3,
            child: Container(
              width: 85,
              height: 85,
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: 0.15),
                borderRadius: BorderRadius.circular(20),
              ),
              child: const Icon(Icons.star, color: Colors.white, size: 36),
            ),
          ),
        ],
      ),
    );
  }
}
