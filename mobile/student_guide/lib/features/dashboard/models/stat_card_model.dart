
import 'package:flutter/material.dart';

class StatCardModel {
  final String title;
  final String value;
  final IconData icon;
  final Color iconColor;
  final Color iconBgColor;

  const StatCardModel({
    required this.title,
    required this.value,
    required this.icon,
    required this.iconColor,
    required this.iconBgColor,
  });
}

final List<StatCardModel> statCards = [
  StatCardModel(
    title: 'Current GPA',
    value: '3.8',
    icon: Icons.workspace_premium,
    iconColor: Color(0xff219469),
    iconBgColor: Color(0xffcffbe4),
  ),
  StatCardModel(
    title: 'Subjects',
    value: '6',
    icon: Icons.menu_book,
    iconColor: Color(0xff3d5af1),
    iconBgColor: Color(0xffe8ebfd),
  ),
  StatCardModel(
    title: 'Next Lecture',
    value: '10:00 AM',
    icon: Icons.access_time,
    iconColor: Color(0xfff0a500),
    iconBgColor: Color(0xfffff3e0),
  ),
  StatCardModel(
    title: 'Upcoming Exams',
    value: '2',
    icon: Icons.calendar_month,
    iconColor: Color(0xffe53935),
    iconBgColor: Color(0xffffebee),
  ),
];
