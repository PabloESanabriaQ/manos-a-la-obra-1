import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";

export default function useAllProjects() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    apiFetch("/projects").then(setProjects);
  }, []);

  return projects;
}
