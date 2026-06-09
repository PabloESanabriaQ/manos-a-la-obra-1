import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { addTaskInput } from "./styles.module.scss";

export default function InputText({ text, setText }) {
  const { t } = useTranslation();

  function handleText(e) {
    return setText(e.target.value);
  }

  return (
    <input
      type="text"
      name="nombre-tarea"
      aria-label={t("common.add")}
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
