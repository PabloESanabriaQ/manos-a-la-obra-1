import PropTypes from "prop-types";
import { listItem, check, checked, completed, text } from "./styles.module.scss";

export default function TaskItem({ task, tasks, setTasks }) {
  const { _id, name, done } = task;

  function handleFinished(_id) {
    const taskList = tasks.map((task) => (task._id === _id ? { ...task, done: !done } : task));
    return setTasks(taskList);
  }

  return (
    <li className={listItem}>
      <input
        type="checkbox"
        onClick={() => handleFinished(_id)}
        className={`${check} ${done ? checked : ""}`}
      />
      <p className={`${text} ${done ? completed : ""}`}>{name}</p>
    </li>
  );
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
  }).isRequired,
  tasks: PropTypes.array.isRequired,
  setTasks: PropTypes.func.isRequired,
};
