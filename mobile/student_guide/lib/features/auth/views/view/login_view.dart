import 'package:flutter/material.dart';
import 'package:student_guide/core/theming/app_text_style.dart';
import '../../../../core/theming/app_colors.dart';

class LoginView extends StatefulWidget {
  const LoginView({super.key});

  @override
  State<LoginView> createState() => _LoginViewState();
}

class _LoginViewState extends State<LoginView> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _obscure = true;
  bool _remember = false;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              // Status pill
              Align(
                alignment: Alignment.centerRight,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                  decoration: BoxDecoration(
                    color: const Color(0xFF2D3250),
                    borderRadius: BorderRadius.circular(24),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(Icons.info, color: Color(0xFFFFB800), size: 16),
                      const SizedBox(width: 6),
                      Text(
                        'University portal\nstatus: Optimal',
                        style: AppTextStyles.sectionLabel.copyWith(color: Colors.white, height: 1.3),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 28),

              // Logo + name
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.school, color: theme.colorScheme.primary, size: 28),
                  const SizedBox(width: 8),
                  Text('Student Guide', style: AppTextStyles.heading2.copyWith(color: theme.textTheme.bodyMedium?.color)),
                ],
              ),
              const SizedBox(height: 32),

              // Welcome heading
              Text('Welcome Back', style: AppTextStyles.heading1.copyWith(fontSize: 30, color: theme.textTheme.bodyMedium?.color)),
              const SizedBox(height: 8),
              Text(
                'Continue your scholarly progress today.',
                style: AppTextStyles.bodyMedium.copyWith(color: theme.textTheme.bodySmall?.color),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 36),

              // Email field
              _FieldLabel('University Email'),
              const SizedBox(height: 6),
              _AuthField(
                controller: _emailController,
                hint: 'name@university.edu',
                icon: Icons.alternate_email,
                keyboardType: TextInputType.emailAddress,
              ),
              const SizedBox(height: 20),

              // Password row label
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  _FieldLabel('Security Code'),
                  TextButton(
                    onPressed: () {},
                    style: TextButton.styleFrom(
                      padding: EdgeInsets.zero,
                      minimumSize: Size.zero,
                      tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                    ),
                    child: Text(
                      'Forgot?',
                      style: AppTextStyles.bodyMedium.copyWith(
                        color: theme.colorScheme.primary,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 6),
              _AuthField(
                controller: _passwordController,
                hint: '••••••••',
                icon: Icons.lock_outline,
                obscure: _obscure,
                suffix: IconButton(
                  icon: Icon(
                    _obscure ? Icons.visibility_outlined : Icons.visibility_off_outlined,
                    size: 20,
                    color: theme.textTheme.bodySmall?.color,
                  ),
                  onPressed: () => setState(() => _obscure = !_obscure),
                ),
              ),
              const SizedBox(height: 16),

              // Remember checkbox
              Row(
                children: [
                  Checkbox(
                    value: _remember,
                    onChanged: (v) => setState(() => _remember = v!),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4)),
                    activeColor: theme.colorScheme.primary,
                  ),
                  Text('Remember this session', style: AppTextStyles.bodyMedium.copyWith(color: theme.textTheme.bodyMedium?.color)),
                ],
              ),
              const SizedBox(height: 24),

              // Sign in button
              SizedBox(
                width: double.infinity,
                height: 52,
                child: ElevatedButton.icon(
                  onPressed: () {
                    // Phase 3: trigger cubit
                  },
                  icon: const SizedBox.shrink(),
                  label: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        'Sign In to Dashboard',
                        style: AppTextStyles.bodyMedium.copyWith(
                          color: Colors.white,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const SizedBox(width: 6),
                      const Icon(Icons.arrow_forward, color: Colors.white, size: 18),
                    ],
                  ),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: theme.colorScheme.primary,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                    elevation: 0,
                  ),
                ),
              ),
              const SizedBox(height: 28),

              // OR divider
              Row(
                children: [
                  Expanded(child: Divider(color: theme.dividerTheme.color ?? Colors.grey.shade300)),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 12),
                    child: Text(
                      'OR CONNECT WITH',
                      style: AppTextStyles.inputLabel.copyWith(
                        color: theme.textTheme.bodySmall?.color,
                        letterSpacing: 0.8,
                      ),
                    ),
                  ),
                  Expanded(child: Divider(color: theme.dividerTheme.color ?? Colors.grey.shade300)),
                ],
              ),
              const SizedBox(height: 20),

              // Social buttons
              Row(
                children: [
                  Expanded(child: _SocialButton(label: 'Google', icon: Icons.g_mobiledata)),
                  const SizedBox(width: 12),
                  Expanded(child: _SocialButton(label: 'LinkedIn', icon: Icons.work_outline)),
                ],
              ),
              const SizedBox(height: 28),

              // Sign up footer
              RichText(
                text: TextSpan(
                  text: 'New to the guide?  ',
                  style: AppTextStyles.bodyMedium.copyWith(color: theme.textTheme.bodySmall?.color),
                  children: [
                    TextSpan(
                      text: 'Create Student Account',
                      style: AppTextStyles.bodyMedium.copyWith(
                        color: theme.colorScheme.primary,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ],
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 12),
            ],
          ),
        ),
      ),
    );
  }
}

class _FieldLabel extends StatelessWidget {
  final String text;
  const _FieldLabel(this.text);

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.centerLeft,
      child: Text(
        text,
        style: AppTextStyles.bodyMedium.copyWith(
          fontWeight: FontWeight.w700,
          color: Theme.of(context).textTheme.bodyMedium?.color,
        ),
      ),
    );
  }
}

class _AuthField extends StatelessWidget {
  final TextEditingController controller;
  final String hint;
  final IconData icon;
  final bool obscure;
  final Widget? suffix;
  final TextInputType? keyboardType;

  const _AuthField({
    required this.controller,
    required this.hint,
    required this.icon,
    this.obscure = false,
    this.suffix,
    this.keyboardType,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    return TextField(
      controller: controller,
      obscureText: obscure,
      keyboardType: keyboardType,
      style: AppTextStyles.bodyMedium.copyWith(color: theme.textTheme.bodyMedium?.color),
      decoration: InputDecoration(
        hintText: hint,
        hintStyle: AppTextStyles.bodyMedium.copyWith(color: theme.hintColor),
        prefixIcon: Icon(icon, size: 20, color: theme.hintColor),
        suffixIcon: suffix,
        filled: true,
        fillColor: theme.inputDecorationTheme.fillColor ?? (isDark ? AppColors.darkSurfaceGrey : const Color(0xFFE8EAF6)),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: BorderSide.none,
        ),
        contentPadding: const EdgeInsets.symmetric(vertical: 16, horizontal: 16),
      ),
    );
  }
}

class _SocialButton extends StatelessWidget {
  final String label;
  final IconData icon;

  const _SocialButton({required this.label, required this.icon});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    return OutlinedButton.icon(
      onPressed: () {},
      icon: Icon(icon, size: 20),
      label: Text(label, style: AppTextStyles.bodyMedium.copyWith(fontWeight: FontWeight.w600, color: isDark ? Colors.white : Colors.black87)),
      style: OutlinedButton.styleFrom(
        padding: const EdgeInsets.symmetric(vertical: 14),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        side: BorderSide(
          color: isDark ? AppColors.darkDivider : Colors.grey.shade300,
        ),
        foregroundColor: isDark ? Colors.white : Colors.black87,
        backgroundColor: isDark ? AppColors.darkSurfaceGrey : Colors.white,
      ),
    );
  }
}