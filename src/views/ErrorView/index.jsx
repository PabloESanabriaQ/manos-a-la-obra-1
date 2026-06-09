import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export default function ErrorView() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  setTimeout(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, 2000);

  return (
    <div className={styles.container}>
      <section className={styles.error}>
        <h1>{t("error.title")}</h1>
        <h4>{t("error.redirecting")}</h4>
      </section>
    </div>
  );
}
