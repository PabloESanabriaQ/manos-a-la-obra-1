import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logout from "../../services/logout";
import { useState } from "react";
import styles from "./styles.module.scss";

export default function Navigation({ setLoggingOut, setUser }) {
  const [hidden, setHidden] = useState(true);

  function handleLogout() {
    logout();
    setLoggingOut(true);
    setHidden(!hidden);
    setTimeout(() => {
      setUser("");
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
          <li className={styles.listItem} onClick={() => setHidden(!hidden)}>
            <Link className={styles.a} to={"home"}>
              Home
            </Link>
          </li>
          <li className={styles.listItem} onClick={() => setHidden(!hidden)}>
            <Link className={styles.a} to={"my-stories"}>
              My Stories
            </Link>
          </li>
          <li className={styles.listItem} onClick={() => setHidden(!hidden)}>
            <Link className={styles.a} to={"settings"}>
              Settings
            </Link>
          </li>
          <li className={styles.listItem} onClick={() => setHidden(!hidden)}>
            <Link className={styles.a} to={"my-projects"}>
              My Projects
            </Link>
          </li>
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
