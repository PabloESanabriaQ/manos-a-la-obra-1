import { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

export default function SuccessToast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={styles.toast}>
      <p className={styles.text}>{message}</p>
      <button className={styles.close} onClick={onClose} aria-label="close">
        ×
      </button>
    </div>
  );
}

SuccessToast.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
