import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";

export default function useAllTasks() {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    apiFetch("/tasks").then(setTasks);
  }, []);

  return tasks;
}
