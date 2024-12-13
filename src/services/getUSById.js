import { useEffect, useState } from "react";

export default function getUSById(){

  const API_URL = import.meta.env.VITE_API_URL;

  const [userStories, setUserStories] = useState(null);

  useEffect(() => {
		fetch(`${API_URL}/projects/${projectId}/epics/${epicId}/stories/${userStoryId}`) 
      .then((response) => response.json()) 
      .then((data) => {
        setUserStories(data); 
      });
	}, []);

	return userStories;
};
