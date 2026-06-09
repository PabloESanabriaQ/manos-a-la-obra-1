const API_URL = import.meta.env.VITE_API_URL;

async function apiFetch(endpoint, options = {}, isRetry = false) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (response.status === 401) {
    if (!isRetry) {
      const refreshed = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });
      if (refreshed.ok) {
        return apiFetch(endpoint, options, true);
      }
    }
    localStorage.removeItem("user");
    window.location.href = "/";
    return;
  }

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const err = new Error(data.message || response.statusText);
    if (data.code) err.code = data.code;
    if (data.params) err.params = data.params;
    throw err;
  }

  return response.json();
}

export { apiFetch };
