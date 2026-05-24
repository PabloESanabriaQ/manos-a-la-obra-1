import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logout from "../../services/logout";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

const NAV_LINKS = [
  { to: "home", labelKey: "nav.home" },
  { to: "my-stories", labelKey: "nav.myStories" },
  { to: "settings", labelKey: "nav.settings" },
  { to: "my-projects", labelKey: "nav.myProjects" },
];

export default function Navigation({ setLoggingOut, setUser }) {
  const [hidden, setHidden] = useState(true);
  const { t } = useTranslation();

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
          {NAV_LINKS.map(({ to, labelKey }) => (
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
  setUser: PropTypes.func.isRequired,
};
