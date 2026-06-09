import { apiFetch } from "../api/client";

export default async function deactivateUser(id) {
  const { data } = await apiFetch(`/users/${id}/deactivate`, { method: "PATCH" });
  return data;
}
