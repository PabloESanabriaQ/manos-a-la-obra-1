import { apiFetch } from "../api/client";

export default async function updateStory(id, { name, description, points, status, assignedTo }) {
  const { data } = await apiFetch(`/stories/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name, description, points, status, assignedTo }),
  });
  return data;
}
