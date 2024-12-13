import { useEffect, useState } from "react";

export default function getUSByEpicId(idEpica){

  const API_URL = import.meta.env.VITE_API_URL;

  const [userStories, setUserStories] = useState(null);

  useEffect(() => {
		fetch(`${API_URL}/epics/${idEpica}/stories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth": `${localStorage.getItem("token")}`,
      },
    } ) 
      .then((response) => response.json()) 
      .then((data) => {
        setUserStories(data); 
      });
	}, []);

	return userStories;
};