import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";

export default function useTaskById(taskId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiFetch(`/tasks/${taskId}`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [taskId]);

  return { data, loading, error };
}
