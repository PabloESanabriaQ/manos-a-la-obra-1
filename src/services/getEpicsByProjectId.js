import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";

export default function useEpicsByProjectId(idProyecto) {
  const [epics, setEpics] = useState(null);

  useEffect(() => {
    apiFetch(`/projects/${idProyecto}/epics`).then(setEpics);
  }, [idProyecto]);

  return epics;
}
