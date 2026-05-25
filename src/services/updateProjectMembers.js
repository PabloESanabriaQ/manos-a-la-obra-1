import { apiFetch } from "../api/client";

// members: [{ user: string, role: 'admin_projects' | 'member' }]
export default async function updateProjectMembers(projectId, members) {
  const { data } = await apiFetch(`/projects/${projectId}/members`, {
    method: "PUT",
    body: JSON.stringify({ members }),
  });
  return data;
}
