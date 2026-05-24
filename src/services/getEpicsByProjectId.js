import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";

export default function useEpicsByProjectId(idProyecto) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiFetch(`/projects/${idProyecto}/epics`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [idProyecto]);

  return { data, loading, error };
}
