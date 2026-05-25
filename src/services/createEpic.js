import { apiFetch } from "../api/client";

export default async function createEpic({ name, description, icon, project }) {
  const { data } = await apiFetch("/epics", {
    method: "POST",
    body: JSON.stringify({ name, description, icon, project }),
  });
  return data;
}
