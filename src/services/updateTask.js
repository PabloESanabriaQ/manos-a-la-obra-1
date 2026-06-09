import { apiFetch } from "../api/client";

export default async function updateTask(id, { name, description, status, done }) {
  const { data } = await apiFetch(`/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ name, description, status, done }),
  });
  return data;
}
