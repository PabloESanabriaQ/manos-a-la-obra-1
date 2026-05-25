import { apiFetch } from "../api/client";

export default async function deleteTask(id) {
  await apiFetch(`/tasks/${id}`, { method: "DELETE" });
}
