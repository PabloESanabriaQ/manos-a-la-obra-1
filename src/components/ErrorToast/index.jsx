import PropTypes from "prop-types";
import styles from "./styles.module.scss";

export default function ErrorToast({ toast, error }) {
  return (
    <div className={`${styles.error} ${toast}`}>
      <p className={styles.p}>{error}</p>
    </div>
  );
}

ErrorToast.propTypes = {
  toast: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
};
