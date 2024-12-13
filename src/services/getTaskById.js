import { useEffect, useState } from "react";

export default function getTaskById(taskId) {

  const API_URL = import.meta.env.VITE_API_URL;

  const [task, setTask] = useState(null);

  useEffect(() => {
		fetch(`${API_URL}/tasks/${taskId}`) 
      .then((response) => response.json()) 
      .then((data) => {
        setTask(data); 
      });
	}, []);

	return task;
};