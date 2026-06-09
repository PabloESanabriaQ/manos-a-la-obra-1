import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export default function LogoutView() {
  const { t } = useTranslation();

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>
        {t("logout.title")}
        <span className={styles.accent}>.</span>
      </h2>
      <p className={styles.subtitle}>{t("logout.subtitle")}</p>
    </section>
  );
}
