import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:student_guide/core/constants/app_images.dart';
import 'package:student_guide/core/theming/app_colors.dart';
import 'package:student_guide/core/theming/app_text_style.dart';

class ShellAppBar extends StatelessWidget implements PreferredSizeWidget {
  const ShellAppBar({super.key});

  @override
  Widget build(BuildContext context) {
    return AppBar(
      title: Text(
        "Student Guide",
        style: AppTextStyles.heading1.copyWith(color: AppColors.textPrimary),
      ),
      actions: [
        IconButton(
          onPressed: () => context.push("/profile"),

          icon: CircleAvatar(
            backgroundImage: AssetImage(AppImages.profileImage),
          ),
        ),
      ],
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
