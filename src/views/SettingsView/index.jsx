import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useTheme from "../../hooks/useTheme";
import changePassword from "../../services/changePassword";
import styles from "./styles.module.scss";

export default function SettingsView() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useTheme();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [pwdSuccess, setPwdSuccess] = useState("");
  const [pwdLoading, setPwdLoading] = useState(false);

  useEffect(() => {
    if (pwdError || pwdSuccess) {
      const t = setTimeout(() => {
        setPwdError("");
        setPwdSuccess("");
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [pwdError, pwdSuccess]);

  function toggleLanguage() {
    const next = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(next);
    localStorage.setItem("language", next);
  }

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  async function handlePasswordSubmit(e) {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPwdError(t("settings.passwordEmpty"));
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwdError(t("settings.passwordMismatch"));
      return;
    }
    setPwdLoading(true);
    const result = await changePassword(currentPassword, newPassword);
    if (result.success) {
      setPwdSuccess(t("settings.passwordSuccess"));
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setPwdError(result.error);
    }
    setPwdLoading(false);
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
        <div className={styles.passwordSection}>
          <h2 className={styles.sectionTitle}>{t("settings.changePassword")}</h2>
          <form className={styles.form} onSubmit={handlePasswordSubmit}>
            <input
              className={styles.input}
              type="password"
              placeholder={t("settings.currentPassword")}
              aria-label={t("settings.currentPassword")}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              className={styles.input}
              type="password"
              placeholder={t("settings.newPassword")}
              aria-label={t("settings.newPassword")}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              className={styles.input}
              type="password"
              placeholder={t("settings.confirmPassword")}
              aria-label={t("settings.confirmPassword")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {pwdError && <p className={styles.error}>{pwdError}</p>}
            {pwdSuccess && <p className={styles.success}>{pwdSuccess}</p>}
            <button className={styles.submit} type="submit" disabled={pwdLoading}>
              {pwdLoading ? "..." : t("settings.save")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
