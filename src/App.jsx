import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import LoginView from "./views/LoginView";
import LogoutView from "./views/LogoutView";
import { useState } from "react";
import { useUser } from "./context/UserContext";

function App() {
  const { user } = useUser();
  const [loggingOut, setLoggingOut] = useState(false);

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
