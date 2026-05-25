import PropTypes from "prop-types";
import EmptyListComponent from "../EmptyListComponent";
import ListComponent from "../ListComponent";
import TitleComponent from "../TitleComponent";
import styles from "./styles.module.scss";

export default function ListContainerComponent({ title, data, path, onEdit, onDelete }) {
  return (
    <section className={styles.container}>
      <TitleComponent title={title} />
      {data != null && data.length === 0 ? (
        <EmptyListComponent />
      ) : (
        <ListComponent data={data} path={path} onEdit={onEdit} onDelete={onDelete} />
      )}
    </section>
  );
}

ListContainerComponent.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array,
  path: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

ListContainerComponent.defaultProps = {
  data: null,
};
