import { apiFetch } from "../api/client";

export default async function createStory({ name, description, points, epic }) {
  const { data } = await apiFetch("/stories", {
    method: "POST",
    body: JSON.stringify({ name, description, points, epic }),
  });
  return data;
}
