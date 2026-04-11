import 'package:flutter/material.dart';
import 'package:student_guide/features/dashboard/models/stat_card_model.dart';
import 'package:student_guide/features/dashboard/views/widgets/stat_card_widget.dart';

class StatCardGridView extends StatelessWidget {
  const StatCardGridView({super.key});

  @override
  Widget build(BuildContext context) {
    return SliverPadding(
      padding: const EdgeInsets.all(8.0),
      sliver: SliverGrid(
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 16,
          mainAxisSpacing: 16,
          childAspectRatio: 1.8,
        ),

        delegate: SliverChildListDelegate(
          statCards.map((card) {
            return StatCard(
              title: card.title,
              value: card.value,
              icon: card.icon,
              iconColor: card.iconColor,
              iconBackgroundColor: card.iconBgColor,
            );
          }).toList(),
        ),
      ),
    );
  }
}
