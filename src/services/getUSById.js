import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";

export default function useUSById(userStoryId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiFetch(`/stories/${userStoryId}`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [userStoryId]);

  return { data, loading, error };
}
