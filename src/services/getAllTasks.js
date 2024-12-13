import { useEffect, useState } from "react";

export default function getAllTasks(){

  const API_URL = import.meta.env.VITE_API_URL;
  
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
		fetch(`${API_URL}/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth": `${localStorage.getItem("token")}`,
      },
    } ) 
      .then((response) => response.json()) 
      .then((data) => {
        setTasks(data); 
      });
	}, []);

	return tasks;
};
