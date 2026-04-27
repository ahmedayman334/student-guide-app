import 'package:flutter/material.dart';
import 'package:student_guide/features/quick_links/models/link_card_model.dart';
import 'package:student_guide/features/quick_links/views/widgets/link_card_widget.dart';
import 'package:student_guide/features/quick_links/views/widgets/quick_links_title_widget.dart';

class QuickLinksView extends StatelessWidget {
  const QuickLinksView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const QuickLinksTitle(),
            const SizedBox(height: 24),
          ...quickLinks.asMap().entries.map(
  (entry) => Padding(
    padding: const EdgeInsets.only(bottom: 12),
    child: LinkCardWidget(
      linkCardModel: entry.value,
      isFirst: entry.key == 0,
    ),
  ),
),
          ],
        ),
      ),
    );
  }
}