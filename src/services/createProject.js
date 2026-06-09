import { apiFetch } from "../api/client";

export default async function createProject({ name, description, adminId }) {
  const { data } = await apiFetch("/projects", {
    method: "POST",
    body: JSON.stringify({ name, description, adminId }),
  });
  return data;
}
