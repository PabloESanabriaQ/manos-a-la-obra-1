import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";

export default function useTasksByUSId(userStoryId) {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    apiFetch(`/stories/${userStoryId}/tasks`).then(setTasks);
  }, [userStoryId]);

  return tasks;
}
