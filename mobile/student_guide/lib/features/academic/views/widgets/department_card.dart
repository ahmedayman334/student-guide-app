// lib/features/academic/views/widgets/department_card.dart

import 'package:flutter/material.dart';
import 'package:student_guide/core/theming/app_text_style.dart';
import 'package:student_guide/features/academic/models/department_model.dart';

class DepartmentCard extends StatelessWidget {
  final DepartmentModel department;

  const DepartmentCard({super.key, required this.department});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.04),
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // ── Icon + Subject Count ─────────────────────────
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: department.iconBackground,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Icon(
                  department.icon,
                  color: department.iconColor,
                  size: 20,
                ),
              ),
              Text(
                '${department.subjectCount} Subjects',
                style: const TextStyle(
                  fontSize: 12,
                  color: Color(0xFF6B7280),
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),

          // ── Name ─────────────────────────────────────────
          Text(
            department.name,
            style: AppTextStyles.displayTitle.copyWith(
              fontSize: 18,
              wordSpacing: 2,
              // fontWeight: FontWeight.w400,
            ),
          ),
          const SizedBox(height: 4),

          // ── Description ───────────────────────────────────
          Text(
            department.description,
            style: const TextStyle(
              fontSize: 13,
              color: Color(0xFF6B7280),
              height: 1.4,
            ),
          ),
          const SizedBox(height: 12),

          // ── View Subjects ─────────────────────────────────
          Row(
            children: [
              Text(
                'View subjects',
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w600,
                  color: department.iconColor,
                ),
              ),
              const SizedBox(width: 4),
              Icon(Icons.arrow_forward, size: 14, color: department.iconColor),
            ],
          ),
        ],
      ),
    );
  }
}
