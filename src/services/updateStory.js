import { apiFetch } from "../api/client";

export default async function updateStory(id, { name, description, points, status }) {
  const { data } = await apiFetch(`/stories/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name, description, points, status }),
  });
  return data;
}
