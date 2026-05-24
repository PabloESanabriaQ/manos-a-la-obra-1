import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";

export default function useTaskById(taskId) {
  const [task, setTask] = useState(null);

  useEffect(() => {
    apiFetch(`/tasks/${taskId}`).then(setTask);
  }, [taskId]);

  return task;
}
