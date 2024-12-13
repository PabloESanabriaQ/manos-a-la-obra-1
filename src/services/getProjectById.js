import { useEffect, useState } from "react";

export default function getProjectById({ projectId }){

  const API_URL = import.meta.env.VITE_API_URL;

  const [project, setProject] = useState(null);

  useEffect(() => {
		fetch(`${API_URL}/projects/${projectId}`,
      {
        headers: {
          auth: `${localStorage.getItem("token")}`,
          //Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
    ) 
      .then((response) => response.json()) 
      .then((data) => {
        setProject(data); 
      });
	}, []);

	return project;
};