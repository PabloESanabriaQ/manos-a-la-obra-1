import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logout from "../../services/logout";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useUser } from "../../context/UserContext";
import styles from "./styles.module.scss";

const LINKS_DEFAULT = [
  { to: "home", labelKey: "nav.home" },
  { to: "my-projects", labelKey: "nav.myProjects" },
  { to: "my-stories", labelKey: "nav.myStories" },
  { to: "settings", labelKey: "nav.settings" },
];

const LINKS_ADMIN_USERS = [
  { to: "home", labelKey: "nav.home" },
  { to: "admin/users", labelKey: "nav.adminUsers" },
  { to: "settings", labelKey: "nav.settings" },
];

export default function Navigation({ setLoggingOut }) {
  const [hidden, setHidden] = useState(true);
  const { t } = useTranslation();
  const { isAdminUsers, setUser } = useUser();

  const links = isAdminUsers() ? LINKS_ADMIN_USERS : LINKS_DEFAULT;

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
