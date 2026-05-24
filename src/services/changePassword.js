import { apiFetch } from "../api/client";

export default async function changePassword(currentPassword, newPassword) {
  try {
    await apiFetch("/users/me/password", {
      method: "PATCH",
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
