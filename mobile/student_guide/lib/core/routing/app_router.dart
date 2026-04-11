import 'package:go_router/go_router.dart';
import 'package:student_guide/core/routing/app_routes.dart';
import 'package:student_guide/features/academic/views/view/academic_view.dart';
import 'package:student_guide/features/auth/views/view/login_view.dart';
import 'package:student_guide/features/auth/views/view/register_view.dart';
import 'package:student_guide/features/dashboard/views/view/dashboard_view.dart';
import 'package:student_guide/features/gpa_calculator/views/view/gpa_view.dart';
import 'package:student_guide/features/profile/views/view/profile_view.dart';
import 'package:student_guide/features/quick_links/views/view/quick_links_view.dart';
import 'package:student_guide/features/schedule/views/view/schedule_view.dart';
import 'package:student_guide/shared/widgets/app_shell.dart';

final GoRouter router = GoRouter(
  initialLocation: AppRoutes.dashboard,

  routes: [
    //--------- stand alone routes ---------
    GoRoute(path: AppRoutes.login, builder: (context, state) => LoginView()),
    GoRoute(
      path: AppRoutes.register,
      builder: (context, state) => RegisterView(),
    ),

    GoRoute(
      path: AppRoutes.profile,
      builder: (context, state) => ProfileView(),
    ),

    //--------- nested routes ---------
    
    StatefulShellRoute.indexedStack(
      builder: (context, state, shell) => AppShell(navigationShell: shell),
      branches: [
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: AppRoutes.dashboard,
              builder: (context, state) => DashboardView(),
            ),
          ],
        ),
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: AppRoutes.academic,
              builder: (context, state) => AcademicView(),
            ),
          ],
        ),
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: AppRoutes.gpa,
              builder: (context, state) => GPAView(),
            ),
          ],
        ),

        StatefulShellBranch(
          routes: [
            GoRoute(
              path: AppRoutes.schedule,
              builder: (context, state) => ScheduleView(),
            ),
          ],
        ),
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: AppRoutes.quickLinks,
              builder: (context, state) => QuickLinksView(),
            ),
          ],
        ),
      ],
    ),
  ],
);
