// lib/features/profile/views/view/profile_view.dart
import 'package:flutter/material.dart';
import '../widgets/profile_header_widget.dart';
import '../widgets/academic_status_card.dart';
import '../widgets/personal_info_card.dart';

class ProfileView extends StatelessWidget {
  const ProfileView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              ProfileHeaderWidget(
                name: 'John Doe',
                subtitle: 'B.Sc. Computer Science • 3rd Year',
                initials: 'JD',
              ),
              SizedBox(height: 24),
              AcademicStatusCard(gpa: 3.85, creditsEarned: 92, totalCredits: 120),
              SizedBox(height: 16),
              // QuickActionsCard(),
              // SizedBox(height: 16),
              PersonalInfoCard(),
              // SizedBox(height: 16),
              // PreferencesCard(),
              // SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }
}