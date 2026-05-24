import { useState } from "react";

export default function useTheme() {
  const [theme, setThemeState] = useState(() => localStorage.getItem("theme") || "light");

  function setTheme(newTheme) {
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setThemeState(newTheme);
  }

  return [theme, setTheme];
}
