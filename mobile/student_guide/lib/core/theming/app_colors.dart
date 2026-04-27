import 'package:flutter/material.dart';

class AppColors {
  AppColors._();

  
  static const LinearGradient balanceGradient = LinearGradient(
    colors: [
      primary,
      Color.fromARGB(255, 101, 114, 200),
    ], // Muted Green to Dark Green 1
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );


  // ─── Brand ─────────────────────────────────────
  static const Color primary = Color(0xFF3D4DB7); // deep blue
  static const Color secondary = Color(0xFF009688); // teal
  static const Color tertiary = Color(0xFFFFB300); // amber

  // ─── Light Theme ───────────────────────────────
  static const Color background = Color(0xFFFFFFFF);
  static const Color scaffoldBackground = Color(0xFFf9f5ff);
  static const Color cardBackground = Color(0xFFFFFFFF);
  static const Color cardScheduleBackground = Color(0xfff3eeff);

  static const Color surfaceGrey = Color(0xFFEEEFF5);

  static const Color textPrimary = Color(0xFF36365F);
  static const Color textSecondary = Color(0xFF617596);
  static const Color textHint = Color(0xFFADB5BD);

  static const Color accent = Color(0xFF3F51B5);
  static const Color success = Color(0xFF009688);
  static const Color warning = Color(0xFFFFB300);
  static const Color error = Color(0xFFE63946);

  static const Color bottomNavActive = Color(0xFF3F51B5);
  static const Color bottomNavInactive = Color(0xFF6A7176);
  static const Color divider = Color(0xFFE9ECEF);

  // ─── Dark Theme ────────────────────────────────
  static const Color darkPrimary = Color(0xFF6674CC);
  static const Color darkBackground = Color(0xFF12121F);
  static const Color darkScaffoldBackground = Color(0xFF12121F);
  static const Color darkSurfaceGrey = Color(0xFF2A2A42);
  static const Color darkCardBackground = Color(0xFF1E2040); // slightly lighter

  static const Color darkTextPrimary = Color(0xFFF1F1F1);
  static const Color darkTextSecondary = Color(0xFFADB5BD);
  static const Color darkTextHint = Color(0xFF6B7280);

  static const Color darkBottomNavActive = Color(0xFF7986CB);
  static const Color darkBottomNavInactive = Color(0xFF6B7280);
  static const Color darkDivider = Color(0xFF2A2A42);
}
