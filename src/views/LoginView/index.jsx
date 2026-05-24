import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import login from "../../services/login";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import ErrorToast from "../../components/ErrorToast";

export default function LoginView({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill out the user and password fields");
      return;
    }
    setLoading(true);
    const result = await login(username, password);
    if (result.success) {
      setUser(result.user);
      navigate("/");
    } else {
      setUsername("");
      setPassword("");
      setError(result.error || "User or password incorrect, please try again");
    }
    setLoading(false);
  }

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.h1}>
          Welcome<span className={styles.span}>.</span>
        </h1>
        <input
          placeholder="username"
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
          {loading ? "..." : "Submit"}
        </button>
      </form>
      {error && <ErrorToast toast={styles.toast} error={error} />}
    </section>
  );
}

LoginView.propTypes = {
  setUser: PropTypes.func.isRequired,
};
