import { apiFetch } from "../api/client";

export default async function deleteStory(id) {
  await apiFetch(`/stories/${id}`, { method: "DELETE" });
}
