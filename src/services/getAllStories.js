import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";

export default function useAllStories({ assignedTo, status } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams();
    if (assignedTo) query.set("assignedTo", assignedTo);
    if (status) query.set("status", status);
    const qs = query.toString();
    setLoading(true);
    apiFetch(`/stories${qs ? `?${qs}` : ""}`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [assignedTo, status]);

  return { data, loading, error };
}
