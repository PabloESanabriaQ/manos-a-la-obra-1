import { apiFetch } from "../api/client";

export default async function login(username, password) {
  try {
    await apiFetch("/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    const { data: user } = await apiFetch("/users/me");
    localStorage.setItem("user", JSON.stringify(user));
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
