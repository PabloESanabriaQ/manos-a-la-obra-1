import PropTypes from "prop-types";
import { addTaskInput } from "./styles.module.scss";

export default function InputText({ text, setText }) {
  function handleText(e) {
    return setText(e.target.value);
  }

  return (
    <input
      type="text"
      name="nombre-tarea"
      className={addTaskInput}
      autoFocus
      value={text}
      onChange={handleText}
    />
  );
}

InputText.propTypes = {
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
};
