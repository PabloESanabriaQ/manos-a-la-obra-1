import PropTypes from "prop-types";
import { addTaskButton } from "./styles.module.scss";

export default function SubmitButton({ text, setText, tasks, setTasks }) {
  function handleSetTasks(e) {
    e.preventDefault();
    setText("");
    const newTask = {
      id: Date.now(),
      titulo: text,
      terminada: false,
    };
    return setTasks([newTask, ...tasks]);
  }

  return <input type="submit" value="ADD" className={addTaskButton} onClick={handleSetTasks} />;
}

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
  setTasks: PropTypes.func.isRequired,
};
