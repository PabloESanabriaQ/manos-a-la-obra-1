import { apiFetch } from "../api/client";

export default async function updateEpic(id, { name, description, icon }) {
  const { data } = await apiFetch(`/epics/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name, description, icon }),
  });
  return data;
}
