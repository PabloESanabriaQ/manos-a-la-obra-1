import { apiFetch } from "../api/client";

export default async function deleteEpic(id) {
  await apiFetch(`/epics/${id}`, { method: "DELETE" });
}
