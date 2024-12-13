import { useEffect, useState } from "react";

export default function getAllProjects(){

  const API_URL = import.meta.env.VITE_API_URL;
  
  const [projects, setProjects] = useState(null);

  useEffect(() => {
		fetch(`${API_URL}/projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth": `${localStorage.getItem("token")}`,
      },
    } ) 
      .then((response) => response.json()) 
      .then((data) => {
        setProjects(data); 
      });
	}, []);

	return projects;
};
