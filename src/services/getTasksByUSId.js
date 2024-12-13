import { useEffect, useState } from "react";

export default function getTasksByUSId(userStoryId) {

  const API_URL = import.meta.env.VITE_API_URL;

  const [tasks, setTasks] = useState(null);

  useEffect(() => {
		fetch(`${API_URL}/stories/${userStoryId}/tasks`) 
      .then((response) => response.json()) 
      .then((data) => {
        setTasks(data); 
      });
	}, []);

	return tasks;
};