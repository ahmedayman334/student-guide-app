// import 'package:flutter/material.dart';
// import 'package:flutter_bloc/flutter_bloc.dart';
// import 'package:student_guide/core/theming/app_colors.dart';
// import 'package:student_guide/core/theming/app_text_style.dart';
// import 'package:student_guide/features/schedule/cubit/schedule_cubit.dart';
// import 'package:student_guide/features/schedule/views/widgets/lecture_type_toggle.dart';

// class AddLectureForm extends StatelessWidget {
//   const AddLectureForm({super.key});

//   static const _days = [
//     'Saturday', 'Sunday', 'Monday', 'Tuesday',
//     'Wednesday', 'Thursday', 'Friday',
//   ];

//   static const _fieldFill = Color(0xFFEEF0FF);

//   static const _labelStyle = TextStyle(
//     fontSize: 16,
//     fontWeight: FontWeight.bold,
//     color: Color(0xFF6B7280),
//   );

//   static InputDecoration _deco({String? hint}) => InputDecoration(
//         hintText: hint,
//         filled: true,
//         fillColor: _fieldFill,
//         border: OutlineInputBorder(
//           borderRadius: BorderRadius.circular(10),
//           borderSide: BorderSide.none,
//         ),
//         enabledBorder: OutlineInputBorder(
//           borderRadius: BorderRadius.circular(10),
//           borderSide: BorderSide.none,
//         ),
//         focusedBorder: OutlineInputBorder(
//           borderRadius: BorderRadius.circular(10),
//           borderSide: BorderSide(color: AppColors.primary, width: 1.5),
//         ),
//         contentPadding:
//             const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
//       );

//   @override
//   Widget build(BuildContext context) {
//     return BlocBuilder<ScheduleCubit, ScheduleState>(
//       builder: (context, state) {
//         final cubit = context.read<ScheduleCubit>();

//         return Container(
//           padding: const EdgeInsets.all(20),
//           decoration: BoxDecoration(
//             color: Colors.white,
//             borderRadius: BorderRadius.circular(16),
//             boxShadow: [
//               BoxShadow(
//                 color: Colors.black.withValues(alpha: 0.05),
//                 blurRadius: 12,
//                 offset: const Offset(0, 4),
//               ),
//             ],
//           ),
//           child: Column(
//             crossAxisAlignment: CrossAxisAlignment.start,
//             children: [
//               // ── Header ─────────────────────────────────────────
//               Row(
//                 children: [
//                   Container(
//                     padding: const EdgeInsets.all(6),
//                     decoration: BoxDecoration(
//                       color: AppColors.primary.withValues(alpha: 0.12),
//                       shape: BoxShape.circle,
//                     ),
//                     child: Icon(Icons.add, color: AppColors.primary, size: 18),
//                   ),
//                   const SizedBox(width: 10),
//                   Text('Add New Lecture', style: AppTextStyles.heading2),
//                 ],
//               ),
//               const SizedBox(height: 20),

//               // ── Subject Name ───────────────────────────────────
//               const Text('Subject Name', style: _labelStyle),
//               const SizedBox(height: 6),
//               TextFormField(
//                 key: ValueKey('subject_${state.lectures.length}'),
//                 initialValue: state.subject,
//                 onChanged: cubit.updateSubject,
//                 decoration: _deco(hint: 'e.g. Quantum Physics'),
//               ),
//               const SizedBox(height: 14),

//               // ── Lecture Hall ───────────────────────────────────
//               const Text('Lecture Hall', style: _labelStyle),
//               const SizedBox(height: 6),
//               TextFormField(
//                 key: ValueKey('room_${state.lectures.length}'),
//                 initialValue: state.room,
//                 onChanged: cubit.updateRoom,
//                 decoration: _deco(hint: 'e.g. Hall C-12'),
//               ),
//               const SizedBox(height: 14),

//               // ── Day of Week ────────────────────────────────────
//               const Text('Day of Week', style: _labelStyle),
//               const SizedBox(height: 6),
//               DropdownButtonFormField<String>(
//                 initialValue: ScheduleState.intToDayName(state.weekday),
//                 icon: const Icon(Icons.keyboard_arrow_down_rounded),
//                 decoration: _deco(),
//                 items: _days
//                     .map((d) => DropdownMenuItem(value: d, child: Text(d)))
//                     .toList(),
//                 onChanged: (val) {
//                   if (val != null) cubit.updateWeekday(val);
//                 },
//               ),
//               const SizedBox(height: 14),

//               // ── Start Time ─────────────────────────────────────
//               const Text('Start Time', style: _labelStyle),
//               const SizedBox(height: 6),
//               _TimeTile(
//                 label: state.startTime?.format(context) ?? '--:-- --',
//                 onTap: () async {
//                   final picked = await showTimePicker(
//                     context: context,
//                     initialTime: state.startTime ?? TimeOfDay.now(),
//                   );
//                   if (picked != null) cubit.updateStartTime(picked);
//                 },
//               ),
//               const SizedBox(height: 14),

//               // ── End Time ───────────────────────────────────────
//               const Text('End Time', style: _labelStyle),
//               const SizedBox(height: 6),
//               _TimeTile(
//                 label: state.endTime?.format(context) ?? '--:-- --',
//                 onTap: () async {
//                   final picked = await showTimePicker(
//                     context: context,
//                     initialTime: state.endTime ?? TimeOfDay.now(),
//                   );
//                   if (picked != null) cubit.updateEndTime(picked);
//                 },
//               ),
//               const SizedBox(height: 14),

//               // ── Type Toggle ────────────────────────────────────
//               const Text('Type', style: _labelStyle),
//               const SizedBox(height: 6),
//               LectureTypeToggle(
//                 selected: state.lectureType,
//                 onChanged: cubit.updateLectureType,
//               ),
//               const SizedBox(height: 24),

//               // ── Submit ─────────────────────────────────────────
//               SizedBox(
//                 width: double.infinity,
//                 height: 50,
//                 child: DecoratedBox(
//                   decoration: BoxDecoration(
//                     gradient: LinearGradient(
//                       colors: [
//                         AppColors.primary,
//                         AppColors.primary.withBlue(220),
//                       ],
//                     ),
//                     borderRadius: BorderRadius.circular(12),
//                   ),
//                   child: ElevatedButton(
//                     onPressed: state.isFormValid ? cubit.submitForm : null,
//                     style: ElevatedButton.styleFrom(
//                       backgroundColor: Colors.transparent,
//                       shadowColor: Colors.transparent,
//                       disabledBackgroundColor: Colors.transparent,
//                       shape: RoundedRectangleBorder(
//                         borderRadius: BorderRadius.circular(12),
//                       ),
//                     ),
//                     child: const Text(
//                       'Add to Schedule',
//                       style: TextStyle(
//                         fontSize: 15,
//                         fontWeight: FontWeight.w600,
//                         color: Colors.white,
//                       ),
//                     ),
//                   ),
//                 ),
//               ),
//             ],
//           ),
//         );
//       },
//     );
//   }
// }

// class _TimeTile extends StatelessWidget {
//   const _TimeTile({required this.label, required this.onTap});

//   final String label;
//   final VoidCallback onTap;

//   @override
//   Widget build(BuildContext context) {
//     final isEmpty = label == '--:-- --';
//     return GestureDetector(
//       onTap: onTap,
//       child: Container(
//         padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
//         decoration: BoxDecoration(
//           color: const Color(0xFFEEF0FF),
//           borderRadius: BorderRadius.circular(10),
//         ),
//         child: Row(
//           mainAxisAlignment: MainAxisAlignment.spaceBetween,
//           children: [
//             Text(
//               label,
//               style: TextStyle(
//                 fontSize: 15,
//                 color: isEmpty
//                     ? const Color(0xFF9CA3AF)
//                     : AppColors.textPrimary,
//               ),
//             ),
//             const Icon(
//               Icons.access_time_rounded,
//               color: Color(0xFF9CA3AF),
//               size: 20,
//             ),
//           ],
//         ),
//       ),
//     );
//   }
// }