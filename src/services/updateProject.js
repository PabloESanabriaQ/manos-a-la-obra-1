import { apiFetch } from "../api/client";

export default async function updateProject(id, { name, description, icon }) {
  const { data } = await apiFetch(`/projects/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ name, description, icon }),
  });
  return data;
}
