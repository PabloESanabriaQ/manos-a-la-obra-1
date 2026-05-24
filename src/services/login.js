import { apiFetch } from "../api/client";

export default function login(user, password) {
  return apiFetch("/login", {
    method: "POST",
    body: JSON.stringify({ username: user, password: password }),
  }).catch((error) => {
    return { success: false, error: error.message };
  });
}
