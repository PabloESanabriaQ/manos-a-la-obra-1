import { apiFetch } from "../api/client";

export default async function getUsers(page = 1, limit = 50) {
  const { data, pagination } = await apiFetch(`/users?page=${page}&limit=${limit}`);
  return { data, pagination };
}
