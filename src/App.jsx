import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import LoginView from "./views/LoginView";
import LogoutView from "./views/LogoutView";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [loggingOut, setLoggingOut] = useState(false);

  if (loggingOut) return <LogoutView />;

  if (!user) {
    return (
      <main>
        <LoginView setUser={setUser} />
      </main>
    );
  }

  return (
    <main>
      <Navigation setUser={setUser} setLoggingOut={setLoggingOut} />
      <Outlet />
    </main>
  );
}

export default App;
