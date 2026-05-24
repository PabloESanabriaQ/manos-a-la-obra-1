import styles from "./styles.module.scss";

export default function ErrorToast({ toast, error }) {
  return (
    <div className={`${styles.error} ${toast}`}>
      <p className={styles.p}>{error}</p>
    </div>
  );
}
