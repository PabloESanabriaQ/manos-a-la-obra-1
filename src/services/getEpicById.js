import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";

export default function useEpicById(epicId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiFetch(`/epics/${epicId}`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [epicId]);

  return { data, loading, error };
}
