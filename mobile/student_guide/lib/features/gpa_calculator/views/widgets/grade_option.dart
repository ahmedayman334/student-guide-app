// lib/features/gpa_calculator/views/widgets/grade_option.dart

class GradeOption {
  final String label;
  final double value;

  const GradeOption({required this.label, required this.value});
}

const List<GradeOption> gradeOptions = [
  GradeOption(label: 'A+ (4.0)', value: 4.0),
  GradeOption(label: 'A (3.9)', value: 3.9),
  GradeOption(label: 'A- (3.7)', value: 3.7),
  GradeOption(label: 'B+ (3.3)', value: 3.3),
  GradeOption(label: 'B (3.0)', value: 3.0),
  GradeOption(label: 'B- (2.7)', value: 2.7),
  GradeOption(label: 'C+ (2.3)', value: 2.3),
  GradeOption(label: 'C (2.0)', value: 2.0),
  GradeOption(label: 'F (0.0)', value: 0.0),
];
