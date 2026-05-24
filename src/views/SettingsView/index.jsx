import { useTranslation } from "react-i18next";
import useTheme from "../../hooks/useTheme";
import styles from "./styles.module.scss";

export default function SettingsView() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useTheme();

  function toggleLanguage() {
    const next = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(next);
    localStorage.setItem("language", next);
  }

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>
        {t("nav.settings")}
        <span className={styles.accent}>.</span>
      </h1>
      <div className={styles.list}>
        <div className={styles.row}>
          <span className={styles.label}>{t("settings.language")}</span>
          <button className={styles.toggle} onClick={toggleLanguage}>
            {i18n.language === "es" ? t("settings.spanish") : t("settings.english")}
          </button>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t("settings.theme")}</span>
          <button className={styles.toggle} onClick={toggleTheme}>
            {theme === "light" ? t("settings.light") : t("settings.dark")}
          </button>
        </div>
      </div>
    </section>
  );
}
