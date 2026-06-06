import { apiRequest } from "./client";
import {
  mapApiChatToAnnouncement,
  mapApiScheduleToLocal,
  mapApiTodoToLocal,
  mapLocalScheduleToApi,
} from "./mappers";

export async function getDepartments() {
  return apiRequest("/departments/", { auth: false });
}

export async function getStudents() {
  return apiRequest("/students/", { auth: false });
}

export async function getSchedules() {
  const data = await apiRequest("/schedules/", { auth: false });
  return Array.isArray(data) ? data.map(mapApiScheduleToLocal) : [];
}

export async function createSchedule(formData) {
  const body = mapLocalScheduleToApi(formData);
  const created = await apiRequest("/schedules/", {
    method: "POST",
    body,
  });
  return mapApiScheduleToLocal(created);
}

export async function deleteSchedule(scheduleId) {
  return apiRequest(`/schedules/${scheduleId}/`, { method: "DELETE" });
}

export async function getExams() {
  return apiRequest("/exams/", { auth: false });
}

export async function createExam(exam) {
  return apiRequest("/exams/", { method: "POST", body: exam });
}

export async function getTodos() {
  const data = await apiRequest("/todos/");
  return Array.isArray(data) ? data.map(mapApiTodoToLocal) : [];
}

export async function createTodo(task_name) {
  const created = await apiRequest("/todos/", {
    method: "POST",
    body: { task_name, is_completed: false },
  });
  return mapApiTodoToLocal(created);
}

export async function updateTodo(id, updates) {
  const updated = await apiRequest(`/todos/${id}/`, {
    method: "PATCH",
    body: updates,
  });
  return mapApiTodoToLocal(updated);
}

export async function deleteTodo(id) {
  return apiRequest(`/todos/${id}/`, { method: "DELETE" });
}

export async function getChats() {
  const data = await apiRequest("/chats/");
  return Array.isArray(data) ? data.map(mapApiChatToAnnouncement) : [];
}

export async function createChat(content) {
  const created = await apiRequest("/chats/", {
    method: "POST",
    body: { content },
  });
  return mapApiChatToAnnouncement(created);
}

export async function updateProfile(formData) {
  const body = new FormData();

  if (formData.name) body.append("full_name", formData.name);
  if (formData.department) body.append("department", formData.department);
  if (formData.currentLevel) body.append("current_level", formData.currentLevel);
  if (formData.gpa !== undefined) body.append("current_cgpa", String(formData.gpa));
  if (formData.credits !== undefined) body.append("total_credits", formData.credits);
  if (formData.coverImage instanceof File) body.append("cover_image", formData.coverImage);

  return apiRequest("/profile/update/", {
    method: "PATCH",
    body,
  });
}

export async function changePassword({ old_password, new_password }) {
  return apiRequest("/profile/change-password/", {
    method: "PUT",
    body: { old_password, new_password },
  });
}
