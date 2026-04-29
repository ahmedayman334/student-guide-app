// lib/features/gpa_calculator/views/widgets/performance_card.dart

import 'package:flutter/material.dart';

class PerformanceCard extends StatelessWidget {
  final double currentGpa;
  final double lastGpa;
  final int totalCredits;
  final String strategyTip;

  const PerformanceCard({
    super.key,
    required this.currentGpa,
    required this.lastGpa,
    required this.totalCredits,
    required this.strategyTip,
  });

  @override
  Widget build(BuildContext context) {
    final shift = ((currentGpa - lastGpa) / lastGpa * 100).clamp(-100.0, 100.0);
    final isPositive = shift >= 0;

    return Column(
      children: [
        // ── Performance Shift ──────────────────────────────
        Container(
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
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Performance Shift',
                      style: TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF1A1A2E))),
                  Text(
                    '${isPositive ? '+' : ''}${shift.toStringAsFixed(0)}%',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: isPositive
                          ? const Color(0xFF059669)
                          : const Color(0xFFDC2626),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10),
              ClipRRect(
                borderRadius: BorderRadius.circular(4),
                child: LinearProgressIndicator(
                  value: (currentGpa / 4.0).clamp(0.0, 1.0),
                  backgroundColor: const Color(0xFFE5E7EB),
                  valueColor: AlwaysStoppedAnimation<Color>(
                    isPositive
                        ? const Color(0xFF059669)
                        : const Color(0xFFDC2626),
                  ),
                  minHeight: 8,
                ),
              ),
              const SizedBox(height: 10),
              Text(
                'Your projected semester GPA is ${isPositive ? 'higher' : 'lower'} than last semester\'s ${lastGpa.toStringAsFixed(2)} by ${(currentGpa - lastGpa).abs().toStringAsFixed(2)} points.',
                style: const TextStyle(fontSize: 12, color: Color(0xFF6B7280)),
              ),
              const Divider(height: 24),
              _StatRow(label: 'Current CGPA', value: currentGpa.toStringAsFixed(2)),
              const SizedBox(height: 8),
              _StatRow(label: 'Total Credits Earnt', value: '$totalCredits'),
            ],
          ),
        ),
        const SizedBox(height: 16),

        // ── Strategy Tip ───────────────────────────────────
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: const Color(0xFFFFFBEB),
            borderRadius: BorderRadius.circular(16),
          ),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('💡', style: TextStyle(fontSize: 20)),
              const SizedBox(width: 10),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Strategy Tip',
                        style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                            color: Color(0xFF1A1A2E))),
                    const SizedBox(height: 4),
                    Text(strategyTip,
                        style: const TextStyle(
                            fontSize: 13,
                            color: Color(0xFF6B7280),
                            height: 1.4)),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _StatRow extends StatelessWidget {
  final String label;
  final String value;
  const _StatRow({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label,
            style: const TextStyle(fontSize: 13, color: Color(0xFF6B7280))),
        Text(value,
            style: const TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.bold,
                color: Color(0xFF1A1A2E))),
      ],
    );
  }
}