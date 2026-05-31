import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ListItemComponent({ item, path, onEdit, onDelete }) {
  const [hidden, setHidden] = useState(true);
  const { t } = useTranslation();

  return (
    <li
      className={styles.listItem}
      onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}
    >
      <Link className={styles.link} to={`/${path}/${item._id}`}>
        <div className={styles.item}>
          <span>{item.icon}</span>
          <p className={styles.text}>{item.name}</p>
        </div>
        <p className={hidden ? styles.hidden : styles.description}>{item.description}</p>
      </Link>

      {!hidden && (onEdit || onDelete) && (
        <div className={styles.actions}>
          {onEdit && (
            <button
              className={styles.btnAction}
              onClick={(e) => {
                e.preventDefault();
                onEdit(item);
              }}
              title={t("crud.edit")}
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M13 1L2 12L1 15L4 14L15 3Z" />
                <line x1="11.5" y1="2.5" x2="13.5" y2="4.5" />
              </svg>
            </button>
          )}
          {onDelete && (
            <button
              className={`${styles.btnAction} ${styles.btnDelete}`}
              onClick={(e) => {
                e.preventDefault();
                onDelete(item._id, item.name);
              }}
              title={t("crud.delete")}
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="2" y1="4" x2="14" y2="4" />
                <path d="M5 4V2.5C5 2.2 5.2 2 5.5 2H10.5C10.8 2 11 2.2 11 2.5V4" />
                <path d="M3.5 4L4.5 14H11.5L12.5 4" />
                <line x1="6.5" y1="7" x2="6.5" y2="11.5" />
                <line x1="9.5" y1="7" x2="9.5" y2="11.5" />
              </svg>
            </button>
          )}
        </div>
      )}
    </li>
  );
}

ListItemComponent.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    icon: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  path: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};
