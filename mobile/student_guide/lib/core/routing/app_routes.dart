class AppRoutes {
  static const home = '/';
  static const profile = '/profile';
  static const dashboard = '/dashboard';
  static const splash = '/splash';
  static const gpa = '/gpa';
  static const quickLinks = '/quickLinks';
  static const schedule = '/schedule';
    static const academic = '/academic';

  static const login = '/auth/login';
  static const register = '/auth/register';

  static String department(String deptId) => '/academic/$deptId';
  static String subject(String deptId, String subjectId) =>
      '/academic/$deptId/$subjectId';
}