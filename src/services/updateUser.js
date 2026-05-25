import { apiFetch } from "../api/client";

export default async function updateUser(id, { username, email, name }) {
  const { data } = await apiFetch(`/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ username, email, name }),
  });
  return data;
}
