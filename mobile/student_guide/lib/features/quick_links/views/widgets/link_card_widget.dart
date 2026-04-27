import 'package:flutter/material.dart';
import 'package:student_guide/core/theming/app_colors.dart';
import 'package:student_guide/core/theming/app_text_style.dart';
import 'package:student_guide/features/quick_links/models/link_card_model.dart';
import 'package:url_launcher/url_launcher.dart';

class LinkCardWidget extends StatelessWidget {
  final LinkCardModel linkCardModel;
  final bool isFirst;

  const LinkCardWidget({
    super.key,
    required this.linkCardModel,
    this.isFirst = false,
  });

  Future<void> _launch() async {
    final uri = Uri.parse(linkCardModel.url); 
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: _launch,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Theme.of(context).colorScheme.surface,
          borderRadius: BorderRadius.circular(16),
          border: isFirst
              ? Border(left: BorderSide(color: AppColors.primary, width: 3))
              : null,
        ),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: linkCardModel.iconBgColor,
                borderRadius: BorderRadius.circular(10),
              ),
              child: Icon(linkCardModel.icon, color: Colors.white, size: 20),
            ),
            const SizedBox(width: 16),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(linkCardModel.title, style: AppTextStyles.heading2),
                const SizedBox(height: 4),
                Text(linkCardModel.description, style: AppTextStyles.bodySmall),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
