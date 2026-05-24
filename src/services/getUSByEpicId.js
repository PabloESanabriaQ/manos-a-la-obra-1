import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";

export default function useUSByEpicId(idEpica) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiFetch(`/epics/${idEpica}/stories`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [idEpica]);

  return { data, loading, error };
}
