import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";

export default function useUSById(userStoryId) {
  const [userStory, setUserStory] = useState(null);

  useEffect(() => {
    apiFetch(`/stories/${userStoryId}`).then(setUserStory);
  }, [userStoryId]);

  return userStory;
}
