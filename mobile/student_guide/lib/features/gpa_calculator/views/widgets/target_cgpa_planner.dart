// lib/features/gpa_calculator/views/widgets/target_cgpa_planner.dart

import 'package:flutter/material.dart';
import 'package:student_guide/core/theming/app_colors.dart';

class TargetCgpaPlanner extends StatelessWidget {
  final double currentCgpa;
  final double targetCgpa;
  final ValueChanged<double> onTargetChanged;

  const TargetCgpaPlanner({
    super.key,
    required this.currentCgpa,
    required this.targetCgpa,
    required this.onTargetChanged,
  });

  @override
  Widget build(BuildContext context) {
    final requiredAvg = ((targetCgpa * (84 + 7)) - (currentCgpa * 84)) / 7;
    final neededAvg = requiredAvg.clamp(0.0, 4.0);

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border(
          left: BorderSide(color: AppColors.primary, width: 4),
        ),
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
          Row(
            children: [
              Icon(Icons.track_changes, color: AppColors.primary, size: 20),
              const SizedBox(width: 8),
              const Text(
                'Target CGPA Planner',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF1A1A2E),
                ),
              ),
            ],
          ),
          const SizedBox(height: 14),
          const Text(
            'Desired Final CGPA',
            style: TextStyle(fontSize: 13, color: Color(0xFF6B7280)),
          ),
          const SizedBox(height: 8),
          SliderTheme(
            data: SliderTheme.of(context).copyWith(
              activeTrackColor: AppColors.primary,
              inactiveTrackColor: const Color(0xFFE5E7EB),
              thumbColor: AppColors.primary,
              overlayColor: AppColors.primary.withValues(alpha: 0.1),
              trackHeight: 4,
            ),
            child: Slider(
              value: targetCgpa,
              min: 0.0,
              max: 4.0,
              divisions: 40,
              onChanged: onTargetChanged,
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Current: ${currentCgpa.toStringAsFixed(2)}',
                  style: const TextStyle(
                      fontSize: 12, color: Color(0xFF6B7280))),
              Text('Target: ${targetCgpa.toStringAsFixed(2)}',
                  style: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                      color: Color(0xFF1A1A2E))),
            ],
          ),
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: const Color(0xFFF0F1FF),
              borderRadius: BorderRadius.circular(10),
            ),
            child: RichText(
              text: TextSpan(
                style: const TextStyle(
                    fontSize: 13, color: Color(0xFF6B7280), height: 1.5),
                children: [
                  const TextSpan(text: 'SIMULATION RESULT\n',
                      style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                          letterSpacing: 0.8)),
                  const TextSpan(text: 'To reach '),
                  TextSpan(
                    text: targetCgpa.toStringAsFixed(2),
                    style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF1A1A2E)),
                  ),
                  const TextSpan(text: ', you need an average of '),
                  TextSpan(
                    text: neededAvg.toStringAsFixed(2),
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: AppColors.primary),
                  ),
                  const TextSpan(text: ' across the next 3 semesters.'),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}