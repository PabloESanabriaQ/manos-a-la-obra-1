import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export default function EmptyListComponent() {
  const { t } = useTranslation();

  return (
    <section className={styles.emptyList}>
      <p>{t("common.emptyList")}</p>
    </section>
  );
}
