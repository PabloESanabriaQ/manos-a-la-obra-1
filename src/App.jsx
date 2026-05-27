import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import LoginView from "./views/LoginView";
import LogoutView from "./views/LogoutView";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useUser } from "./context/UserContext";

function App() {
  const { user } = useUser();
  const [loggingOut, setLoggingOut] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  if (loggingOut) return <LogoutView />;

  if (!user) {
    return (
      <main>
        <LoginView />
      </main>
    );
  }

  return (
    <main>
      <Navigation setLoggingOut={setLoggingOut} />
      <Outlet />
    </main>
  );
}

export default App;
