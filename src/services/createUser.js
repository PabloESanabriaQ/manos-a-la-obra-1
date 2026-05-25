import { apiFetch } from "../api/client";

export default async function createUser({ username, email, password, role }) {
  const { data } = await apiFetch("/users", {
    method: "POST",
    body: JSON.stringify({ username, email, password, role }),
  });
  return data;
}
