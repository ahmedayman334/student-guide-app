import 'package:flutter/material.dart';
import 'package:student_guide/core/theming/app_text_style.dart';
import 'app_colors.dart';

class AppTheme {
  AppTheme._();

  // ─── Light ─────────────────────────────────────
  static ThemeData get lightTheme => ThemeData(
        useMaterial3: true,
        brightness: Brightness.light,
        scaffoldBackgroundColor: AppColors.scaffoldBackground,

        // ✅ GLOBAL TEXT THEME (MAIN FIX)
        textTheme: TextTheme(
          titleLarge: AppTextStyles.heading2.copyWith(
            color: AppColors.textPrimary,
          ),
          bodyMedium: AppTextStyles.bodyMedium.copyWith(
            color: AppColors.textPrimary,
          ),
          bodySmall: AppTextStyles.bodySmall.copyWith(
            color: AppColors.textSecondary,
          ),
        ),

        colorScheme: const ColorScheme.light(
          primary: AppColors.primary,
          secondary: AppColors.secondary,
          tertiary: AppColors.tertiary,
          surface: AppColors.cardBackground,
          error: AppColors.error,
        ),

        appBarTheme: AppBarTheme(
          backgroundColor: AppColors.background,
          foregroundColor: AppColors.textPrimary,
          elevation: 0,
          centerTitle: false,
          titleTextStyle: AppTextStyles.heading2.copyWith(
            color: AppColors.textPrimary,
          ),
        ),

        cardTheme: CardThemeData(
          color: AppColors.cardBackground,
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
        ),

        navigationBarTheme: NavigationBarThemeData(
          backgroundColor: AppColors.background,
          indicatorColor: AppColors.primary.withValues(alpha: 0.15),
          iconTheme: WidgetStateProperty.resolveWith((states) {
            if (states.contains(WidgetState.selected)) {
              return const IconThemeData(color: AppColors.primary);
            }
            return const IconThemeData(color: AppColors.bottomNavInactive);
          }),
          labelTextStyle: WidgetStateProperty.resolveWith((states) {
            if (states.contains(WidgetState.selected)) {
              return AppTextStyles.navLabel.copyWith(
                color: AppColors.primary,
              );
            }
            return AppTextStyles.navLabel.copyWith(
              color: AppColors.bottomNavInactive,
            );
          }),
        ),

        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: AppColors.primary,
            foregroundColor: Colors.white,
            elevation: 0,
            padding: const EdgeInsets.symmetric(
              horizontal: 24,
              vertical: 14,
            ),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            textStyle: AppTextStyles.buttonPrimary,
          ),
        ),

        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: AppColors.surfaceGrey,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide.none,
          ),
          contentPadding: const EdgeInsets.symmetric(
            horizontal: 16,
            vertical: 14,
          ),
          hintStyle: AppTextStyles.inputHint,
        ),

        dividerTheme: const DividerThemeData(
          color: AppColors.divider,
          thickness: 1,
        ),
      );

  // ─── Dark ──────────────────────────────────────
  static ThemeData get darkTheme => ThemeData(
        useMaterial3: true,
        brightness: Brightness.dark,
        scaffoldBackgroundColor: AppColors.darkScaffoldBackground,

        // ✅ GLOBAL TEXT THEME
        textTheme: TextTheme(
          titleLarge: AppTextStyles.heading2.copyWith(
            color: AppColors.darkTextPrimary,
          ),
          bodyMedium: AppTextStyles.bodyMedium.copyWith(
            color: AppColors.darkTextPrimary,
          ),
          bodySmall: AppTextStyles.bodySmall.copyWith(
            color: AppColors.darkTextSecondary,
          ),
        ),

        colorScheme: const ColorScheme.dark(
          primary: AppColors.darkPrimary,
          secondary: AppColors.secondary,
          tertiary: AppColors.tertiary,
          surface: AppColors.darkCardBackground,
          error: AppColors.error,
        ),

        appBarTheme: AppBarTheme(
          backgroundColor: AppColors.darkBackground,
          foregroundColor: AppColors.darkTextPrimary,
          elevation: 0,
          centerTitle: false,
          titleTextStyle: AppTextStyles.heading2.copyWith(
            color: AppColors.darkTextPrimary,
          ),
        ),

        cardTheme: CardThemeData(
          color: AppColors.darkCardBackground,
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
        ),

        navigationBarTheme: NavigationBarThemeData(
          backgroundColor: AppColors.darkBackground,
          indicatorColor: AppColors.darkPrimary.withValues(alpha: 0.15),
          iconTheme: WidgetStateProperty.resolveWith((states) {
            if (states.contains(WidgetState.selected)) {
              return const IconThemeData(color: AppColors.darkPrimary);
            }
            return const IconThemeData(
              color: AppColors.darkBottomNavInactive,
            );
          }),
          labelTextStyle: WidgetStateProperty.resolveWith((states) {
            if (states.contains(WidgetState.selected)) {
              return AppTextStyles.navLabel.copyWith(
                color: AppColors.darkPrimary,
              );
            }
            return AppTextStyles.navLabel.copyWith(
              color: AppColors.darkBottomNavInactive,
            );
          }),
        ),

        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: AppColors.darkPrimary,
            foregroundColor: Colors.white,
            elevation: 0,
            padding: const EdgeInsets.symmetric(
              horizontal: 24,
              vertical: 14,
            ),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            textStyle: AppTextStyles.buttonPrimary,
          ),
        ),

        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: AppColors.darkSurfaceGrey,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide.none,
          ),
          contentPadding: const EdgeInsets.symmetric(
            horizontal: 16,
            vertical: 14,
          ),
          hintStyle: AppTextStyles.inputHint,
        ),

        dividerTheme: const DividerThemeData(
          color: AppColors.darkDivider,
          thickness: 1,
        ),
      );
}