import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logout from "../../services/logout";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useUser } from "../../context/UserContext";
import styles from "./styles.module.scss";

const LINKS_DEFAULT = [
  { to: "home", labelKey: "nav.home" },
  { to: "my-projects", labelKey: "nav.myProjects" },
  { to: "my-stories", labelKey: "nav.myStories" },
  { to: "profile", labelKey: "nav.profile" },
  { to: "settings", labelKey: "nav.settings" },
];

const LINKS_ADMIN_USERS = [
  { to: "home", labelKey: "nav.home" },
  { to: "profile", labelKey: "nav.profile" },
  { to: "settings", labelKey: "nav.settings" },
];

export default function Navigation({ setLoggingOut }) {
  const [hidden, setHidden] = useState(true);
  const { t } = useTranslation();
  const { isAdminUsers, setUser } = useUser();

  const links = isAdminUsers() ? LINKS_ADMIN_USERS : LINKS_DEFAULT;

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && !hidden) setHidden(true);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [hidden]);

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
      <button
        className={`${styles.hamburger} ${!hidden ? styles.active : ""}`}
        onClick={() => setHidden(!hidden)}
        aria-expanded={!hidden}
        aria-controls="main-nav"
        aria-label={t("nav.menu")}
      >
        <span className={`${styles.bar} ${!hidden ? styles.open : ""}`}></span>
        <span className={`${styles.bar} ${!hidden ? styles.open : ""}`}></span>
        <span className={`${styles.bar} ${!hidden ? styles.open : ""}`}></span>
      </button>
      <nav id="main-nav" aria-hidden={hidden} className={!hidden ? styles.showNav : styles.hideNav}>
        <ul className={!hidden ? styles.showNav : styles.hideNav}>
          {links.map(({ to, labelKey }) => (
            <li key={to} className={styles.listItem} onClick={() => setHidden(true)}>
              <Link className={styles.a} to={to}>
                {t(labelKey)}
              </Link>
            </li>
          ))}
          <li className={styles.listItem} onClick={handleLogout}>
            <Link className={`${styles.a} ${styles.logout}`} to={""}>
              {t("nav.logOut")}
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

Navigation.propTypes = {
  setLoggingOut: PropTypes.func.isRequired,
};
