import 'package:flutter/material.dart';

class DepartmentModel {
  final String name;
  final String description;
  final int subjectCount;
  final IconData icon;
  final Color iconColor;
  final Color iconBackground;

  const DepartmentModel({
    required this.name,
    required this.description,
    required this.subjectCount,
    required this.icon,
    required this.iconColor,
    required this.iconBackground,
  });
}

final List<DepartmentModel> departments = [
  DepartmentModel(
    name: 'Computer Science',
    description:
        'Programming, software engineering, artificial intelligence, and data structures.',
    subjectCount: 124,
    icon: Icons.monitor_outlined,
    iconColor: const Color(0xFF4B6BFB),
    iconBackground: const Color(0xFFEEF0FF),
  ),
  DepartmentModel(
    name: 'Chemistry',
    description:
        'Organic chemistry, analytical chemistry, and laboratory sciences.',
    subjectCount: 95,
    icon: Icons.science_outlined,
    iconColor: const Color(0xFF059669),
    iconBackground: const Color(0xFFD1FAE5),
  ),
  DepartmentModel(
    name: 'Mathematics',
    description:
        'Algebra, calculus, differential equations, and mathematical modeling.',
    subjectCount: 88,
    icon: Icons.calculate_outlined,
    iconColor: const Color(0xFFD97706),
    iconBackground: const Color(0xFFFEF3C7),
  ),
  DepartmentModel(
    name: 'Physics',
    description:
        'Classical mechanics, quantum physics, and modern scientific research.',
    subjectCount: 92,
    icon: Icons.bolt_outlined,
    iconColor: const Color(0xFF6366F1),
    iconBackground: const Color(0xFFEEF2FF),
  ),
  DepartmentModel(
    name: 'Statistics',
    description:
        'Probability, data analysis, statistical inference, and machine learning.',
    subjectCount: 76,
    icon: Icons.bar_chart_outlined,
    iconColor: const Color(0xFFDC2626),
    iconBackground: const Color(0xFFFEE2E2),
  ),
  DepartmentModel(
    name: 'Materials Science',
    description:
        'Material properties, nanotechnology, and advanced engineering materials.',
    subjectCount: 70,
    icon: Icons.category_outlined,
    iconColor: const Color(0xFF6B7280),
    iconBackground: const Color(0xFFF3F4F6),
  ),
];
