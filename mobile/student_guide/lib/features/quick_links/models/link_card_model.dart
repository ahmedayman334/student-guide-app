import 'package:flutter/material.dart';
import 'package:student_guide/core/constants/links.dart';

class LinkCardModel {
  final IconData icon;
  final Color iconColor;
  final Color iconBgColor;
  final String title;
  final String description;
  final String url;

  const LinkCardModel({
    required this.icon,
    required this.iconColor,
    required this.iconBgColor,
    required this.title,
    required this.description,
    required this.url,
  });
}

const List<LinkCardModel> quickLinks = [
  LinkCardModel(
    icon: Icons.app_registration,
    iconColor: Colors.white,
    iconBgColor: Color(0xFF6B7BD4),
    title: "Course Registration",
    description: "Enroll in next semester modules",
    url: AppLinks.courseRegistration,
  ),
  LinkCardModel(
    icon: Icons.bar_chart,
    iconColor: Colors.white,
    iconBgColor: Color(0xFF4CAF50),
    title: "Exam Results",
    description: "View latest grades",
    url: AppLinks.results,
  ),
  LinkCardModel(
    icon: Icons.calendar_month,
    iconColor: Colors.white,
    iconBgColor: Color(0xFFFFA726),
    title: "Faculty web",
    description: "Full year timeline",
    url: AppLinks.faculty,
  ),
  LinkCardModel(
    icon: Icons.payment,
    iconColor: Colors.white,
    iconBgColor: Color(0xFFEF5350),
    title: "Tuition Payment",
    description: "Manage billing & fees",
    url: AppLinks.payment,
  ),
  LinkCardModel(
    icon: Icons.support_agent,
    iconColor: Colors.white,
    iconBgColor: Color(0xFF26A69A),
    title: "Student Affairs",
    description: "Council & support services",
    url: AppLinks.staff,
  ),
  LinkCardModel(
    icon: Icons.menu_book,
    iconColor: Colors.white,
    iconBgColor: Color(0xFF5C6BC0),
    title: "Academic books",
    description: "Journals & archives",
    url: AppLinks.books,
  ),
  LinkCardModel(
    icon: Icons.mail_outline,
    iconColor: Colors.white,
    iconBgColor: Color(0xFF8D6E63),
    title: "Student Email",
    description: "Access your university email",
    url: AppLinks.email,
  ),
  LinkCardModel(
    icon: Icons.help_outline,
    iconColor: Colors.white,
    iconBgColor: Color(0xFFAB47BC),
    title: "Repeated Quistions",
    description: "Technical help & questions",
    url: AppLinks.questions,
  ),
];
