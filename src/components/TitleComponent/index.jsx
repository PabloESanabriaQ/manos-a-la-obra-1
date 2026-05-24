import PropTypes from "prop-types";
import styles from "./styles.module.scss";

export default function TitleComponent({ title }) {
  return <h1 className={styles.title}>{title}</h1>;
}

TitleComponent.propTypes = {
  title: PropTypes.string.isRequired,
};
