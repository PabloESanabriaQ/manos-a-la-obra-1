import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";

export default function useProjectById({ projectId }) {
  const [project, setProject] = useState(null);

  useEffect(() => {
    apiFetch(`/projects/${projectId}`).then(setProject);
  }, [projectId]);

  return project;
}
