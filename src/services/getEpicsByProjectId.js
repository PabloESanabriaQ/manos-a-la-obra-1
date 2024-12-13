import { useEffect, useState } from "react";

export default function getEpicsByProjectId(idProyecto){

  const API_URL = import.meta.env.VITE_API_URL;

  const [epics, setEpics] = useState(null);

  useEffect(() => {
		fetch(`${API_URL}/projects/${idProyecto}/epics`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth": `${localStorage.getItem("token")}`,
      },
    }    
    ) 
      .then((response) => response.json()) 
      .then((data) => {
        setEpics(data); 
      });
	}, []);

	return epics;
};