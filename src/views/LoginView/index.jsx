import { useEffect, useState } from "react";
import login from "../../services/login";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import ErrorToast from "../../components/ErrorToast";

export default function LoginView({ user, setUser }){

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    if(error){
      const timeout = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  function handleUser(e){
    setUser(e.target.value);
  }
    

  function handlePassword(e){
    setPassword(e.target.value);
  }    

  function handleSubmit(e){
    e.preventDefault();

    if(!user || !password){
      setError("Please fill out the user and password fields");
      return;
    }
    setLoading(true);
    login(user, password)
      .then((response) => {
        if (response.success) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setUser(response.data.user);
          navigate("/");
        } else {
          setUser("");
          setPassword("");
          setError("User or password incorrect, please try again");
        }
      })
      .catch((error) => {
        setError("There was an error, please try again soon...");
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.h1}>Welcome<span className={styles.span}>.</span></h1>
        <input placeholder="username" className={styles.input} type="text" autoFocus value={user} onChange={(e) => handleUser(e)}/>
        <input placeholder="************" className={styles.input} type="password" value={password}  onChange={(e) => handlePassword(e)} />
        <button className={`${loading ? styles.loading: styles.submit}`} type="submit" disabled={loading}>
          {loading ? "..." : "Submit"}
        </button>
      </form>
      {error && <ErrorToast toast={styles.toast} error={error} />}
    </section>
  )
}