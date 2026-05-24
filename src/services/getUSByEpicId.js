import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";

export default function useUSByEpicId(idEpica) {
  const [userStories, setUserStories] = useState(null);

  useEffect(() => {
    apiFetch(`/epics/${idEpica}/stories`).then(setUserStories);
  }, [idEpica]);

  return userStories;
}
