import PropTypes from "prop-types";
import styles from "./styles.module.scss";

export default function PaginationComponent({ page, totalPages, onPageChange }) {
  return (
    <div className={styles.pagination}>
      <button
        className={styles.button}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        ←
      </button>
      <span className={styles.info}>
        {page} / {totalPages}
      </span>
      <button
        className={styles.button}
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        →
      </button>
    </div>
  );
}

PaginationComponent.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
