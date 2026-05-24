import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

export default function ErrorView() {
  const navigate = useNavigate();
  setTimeout(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, 2000);
  return (
    <div className={styles.container}>
      <section className={styles.error}>
        <h1>Error 404 - Page not Found</h1>
        <h4>Redirecting to the main page...</h4>
      </section>
    </div>
  );
}
