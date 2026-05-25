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
              ✏️
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
              🗑️
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
