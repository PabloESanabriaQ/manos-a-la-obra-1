import { apiFetch } from "../api/client";

export default async function logout() {
  try {
    await apiFetch("/logout", { method: "POST" });
  } finally {
    localStorage.removeItem("user");
  }
}
