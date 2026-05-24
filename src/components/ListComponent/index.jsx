import PropTypes from "prop-types";
import ListItemComponent from "../ListItemComponent";
import styles from "./styles.module.scss";

export default function ListComponent({ data, path }) {
  return (
    <ul className={styles.list}>
      {data.map((item) => {
        return <ListItemComponent key={item._id} item={item} path={path} />;
      })}
    </ul>
  );
}

ListComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({ _id: PropTypes.string.isRequired })).isRequired,
  path: PropTypes.string.isRequired,
};
