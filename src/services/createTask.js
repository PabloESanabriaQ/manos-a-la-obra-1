import { apiFetch } from "../api/client";

export default async function createTask({ name, description, story }) {
  const { data } = await apiFetch("/tasks", {
    method: "POST",
    body: JSON.stringify({ name, description, story }),
  });
  return data;
}
