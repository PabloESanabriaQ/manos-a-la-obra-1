import { useState } from "react";
import { useTranslation } from "react-i18next";
import login from "../../services/login";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import ErrorToast from "../../components/ErrorToast";
import { useUser } from "../../context/UserContext";

export default function LoginView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { setUser } = useUser();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!username || !password) {
      setError(t("login.errorEmpty"));
      return;
    }
    setLoading(true);
    const result = await login(username, password);
    if (result.success) {
      setUser(result.user);
      navigate(result.user.role === "admin_users" ? "/admin/users" : "/my-projects");
    } else {
      setUsername("");
      setPassword("");
      setError(result.error || t("login.errorInvalid"));
    }
    setLoading(false);
  }

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.h1}>
          {t("login.welcome")}
          <span className={styles.span}>.</span>
        </h1>
        <input
          placeholder={t("login.usernamePlaceholder")}
          className={styles.input}
          type="text"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="************"
          className={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className={`${loading ? styles.loading : styles.submit}`}
          type="submit"
          disabled={loading}
        >
          {loading ? "..." : t("login.submit")}
        </button>
      </form>
      {error && <ErrorToast message={error} onClose={() => setError("")} />}
    </section>
  );
}
