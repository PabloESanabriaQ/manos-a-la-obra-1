import PropTypes from "prop-types";
import ListItemComponent from "../ListItemComponent";
import styles from "./styles.module.scss";

export default function ListComponent({ data, path, onEdit, onDelete }) {
  return (
    <ul className={styles.list}>
      {data.map((item) => (
        <ListItemComponent
          key={item._id}
          item={item}
          path={path}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

ListComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({ _id: PropTypes.string.isRequired })).isRequired,
  path: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};
