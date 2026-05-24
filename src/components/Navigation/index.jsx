import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logout from "../../services/logout";
import { useState } from "react";
import styles from "./styles.module.scss";

const NAV_LINKS = [
  { to: "home", label: "Home" },
  { to: "my-stories", label: "My Stories" },
  { to: "settings", label: "Settings" },
  { to: "my-projects", label: "My Projects" },
];

export default function Navigation({ setLoggingOut, setUser }) {
  const [hidden, setHidden] = useState(true);

  function handleLogout() {
    logout();
    setLoggingOut(true);
    setHidden(true);
    setTimeout(() => {
      setUser(null);
      setLoggingOut(false);
    }, 3000);
  }

  return (
    <>
      <div
        className={`${styles.hamburger} ${!hidden ? styles.active : ""}`}
        onClick={() => setHidden(!hidden)}
      >
        <span className={`${styles.bar} ${!hidden ? styles.open : ""}`}></span>
        <span className={`${styles.bar} ${!hidden ? styles.open : ""}`}></span>
        <span className={`${styles.bar} ${!hidden ? styles.open : ""}`}></span>
      </div>
      <nav className={!hidden ? styles.showNav : styles.hideNav}>
        <ul className={!hidden ? styles.showNav : styles.hideNav}>
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to} className={styles.listItem} onClick={() => setHidden(true)}>
              <Link className={styles.a} to={to}>
                {label}
              </Link>
            </li>
          ))}
          <li className={styles.listItem} onClick={handleLogout}>
            <Link className={`${styles.a} ${styles.logout}`} to={""}>
              Log Out
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

Navigation.propTypes = {
  setLoggingOut: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};
