import styles from "./styles.module.scss";

export default function LogoutView() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>
        Muchas gracias por venir<span className={styles.accent}>.</span>
      </h2>
      <p className={styles.subtitle}>Volviendo a la página de inicio de sesión...</p>
    </section>
  );
}
