import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import LoginView from "./views/LoginView";
import LogoutView from "./views/LogoutView";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && !user) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [user, token]);

  if (loggingOut) {
    return <LogoutView />;
  }

  if (!token) {
    return (
      <main>
        <LoginView user={user} setUser={setUser} />
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
