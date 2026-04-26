class StatCardModel {
  final String title;
  final String value;
  final String? subtitle;

  const StatCardModel({
    required this.title,
    required this.value,
    this.subtitle,
  });
}

final List<StatCardModel> statCards = [
  StatCardModel(
    title: 'Current GPA',
    value: '3.82',
    subtitle: "+0.12 this term",
  ),
  StatCardModel(title: 'Subjects', value: '6'),
  StatCardModel(title: 'Next Lecture', value: "DS", subtitle: "10:30 AM"),
  StatCardModel(title: 'Upcoming Exams', value: '2', subtitle: "Next: friday"),
];
