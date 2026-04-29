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
    description: 'Software engineering, AI systems, and computational theory.',
    subjectCount: 124,
    icon: Icons.monitor_outlined,
    iconColor: const Color(0xFF4B6BFB),
    iconBackground: const Color(0xFFEEF0FF),
  ),
  DepartmentModel(
    name: 'Engineering',
    description: 'Structural analysis, thermodynamics, and robotics design.',
    subjectCount: 99,
    icon: Icons.architecture,
    iconColor: const Color(0xFF6B7280),
    iconBackground: const Color(0xFFF3F4F6),
  ),
  DepartmentModel(
    name: 'Arts & Design',
    description:
        'Visual communication, fine arts, and digital media production.',
    subjectCount: 65,
    icon: Icons.palette_outlined,
    iconColor: const Color(0xFFD97706),
    iconBackground: const Color(0xFFFEF3C7),
  ),
  DepartmentModel(
    name: 'Business School',
    description: 'Economics, global trade, and strategic management.',
    subjectCount: 82,
    icon: Icons.videocam_outlined,
    iconColor: const Color(0xFF6366F1),
    iconBackground: const Color(0xFFEEF2FF),
  ),
  DepartmentModel(
    name: 'Medical Sciences',
    description: 'Anatomy, clinical practice, and neuroscience studies.',
    subjectCount: 112,
    icon: Icons.shield_outlined,
    iconColor: const Color(0xFFDC2626),
    iconBackground: const Color(0xFFFEE2E2),
  ),
  DepartmentModel(
    name: 'Social Sciences',
    description: 'Sociology, anthropology, and political science.',
    subjectCount: 74,
    icon: Icons.group_outlined,
    iconColor: const Color(0xFF059669),
    iconBackground: const Color(0xFFD1FAE5),
  ),
];
