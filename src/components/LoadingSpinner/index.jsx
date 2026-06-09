import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export default function LoadingSpinner() {
  const { t } = useTranslation();
  return (
    <div role="status" className={styles.container} aria-label={t("common.loading")}>
      <div className={styles.ring} aria-hidden="true">
        <div className={styles.spinner} />
      </div>
      <span className={styles.text}>{t("common.loading")}</span>
    </div>
  );
}
