import { DAY_TO_DATE_OFFSET, LEVEL_LABELS } from "./config";

const SCHEDULE_COLORS = [
  { bgColor: "bg-[#EEF0FF]", textColor: "text-[#4E58CA]", iconType: "book" },
  { bgColor: "bg-[#DFF1EB]", textColor: "text-[#2A9D79]", iconType: "flask" },
  { bgColor: "bg-[#F3DEC9]", textColor: "text-[#D68D4F]", iconType: "palette" },
  { bgColor: "bg-[#FFF4E5]", textColor: "text-[#FF9800]", iconType: "book" },
];

function getNextDateForDay(dayOfWeek) {
  const target = DAY_TO_DATE_OFFSET[dayOfWeek?.toLowerCase()];
  if (target === undefined) return new Date().toISOString().split("T")[0];

  const now = new Date();
  const current = now.getDay();
  let diff = target - current;
  if (diff < 0) diff += 7;

  const result = new Date(now);
  result.setDate(now.getDate() + diff);
  return result.toISOString().split("T")[0];
}

export function mapStudentToUser(student, extra = {}) {
  if (!student) return null;

  const department =
    typeof student.department === "object"
      ? student.department?.name
      : student.department;

  const level =
    typeof student.current_level === "number"
      ? student.current_level
      : parseInt(student.current_level, 10);

  return {
    id: student.student_id,
    studentId: student.student_id,
    name: student.full_name,
    email: extra.email || student.email || "",
    username: extra.username || student.username || "",
    department: department || "",
    year: LEVEL_LABELS[level] || `Level ${level}`,
    currentLevel: level,
    gpa: parseFloat(student.current_cgpa) || 0,
    credits: student.total_credits || 0,
    role: student.role || "student",
    coverImage: student.cover_image,
    subjects: student.subjects || [],
    notifications: extra.notifications || [],
    targetGpa: extra.targetGpa ?? 3.85,
    coursework: extra.coursework || [],
  };
}

export function mapApiScheduleToLocal(schedule, index = 0) {
  const colors = SCHEDULE_COLORS[index % SCHEDULE_COLORS.length];

  return {
    id: schedule.schedule_id,
    apiId: schedule.schedule_id,
    title: schedule.subject || schedule.type || "Class",
    type: schedule.type || "Lecture",
    date: getNextDateForDay(schedule.day_of_week),
    time: schedule.start_time?.slice(0, 5) || "09:00",
    endTime: schedule.end_time?.slice(0, 5),
    room: schedule.hall_location || "TBD",
    dayOfWeek: schedule.day_of_week,
    targetLevel: schedule.target_level,
    department: schedule.department,
    subject: schedule.subject,
    ...colors,
  };
}

export function mapLocalScheduleToApi(formData) {
  const dayMap = {
    0: "sunday",
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: "saturday",
  };

  const date = new Date(formData.date);
  const dayOfWeek = dayMap[date.getDay()] || "saturday";

  return {
    target_level: formData.targetLevel || 1,
    type: formData.type || "Lecture",
    hall_location: formData.room || "TBD",
    day_of_week: dayOfWeek,
    start_time: formData.time || "09:00",
    end_time: formData.endTime || "10:00",
    department: formData.department || null,
    subject: formData.title || null,
  };
}

export function mapApiTodoToLocal(todo) {
  return {
    id: todo.todo_id,
    apiId: todo.todo_id,
    label: todo.task_name,
    checked: todo.is_completed,
  };
}

export function mapApiChatToAnnouncement(chat) {
  return {
    id: chat.message_id,
    apiId: chat.message_id,
    title: `${chat.sender_name || "Admin"} — Level ${chat.target_level || ""}`,
    desc: chat.content,
    date: chat.created_at,
    priority: "important",
    status: "Sent",
  };
}

export function yearLabelToLevel(year) {
  const map = {
    "First Year": 1,
    "Second Year": 2,
    "Third Year": 3,
    "Fourth Year": 4,
    "Fifth Year": 5,
  };
  return map[year] || 1;
}
