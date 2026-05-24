export default function login(user, password) {

  const API_URL = import.meta.env.VITE_API_URL;

  return fetch(`${API_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ username: user, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => {
      return data
    })
    .catch((error) => {
      return { success: false, error: error.message };
    });
};