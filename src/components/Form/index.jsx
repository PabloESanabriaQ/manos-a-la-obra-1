import PropTypes from "prop-types";
import { useState } from "react";
import { form } from "./styles.module.scss";
import InputText from "../InputText";
import SubmitButton from "../SubmitButton";

export default function Form({ tasks, setTasks }) {
  const [text, setText] = useState("");

  return (
    <form className={form}>
      <InputText text={text} setText={setText} />
      <SubmitButton text={text} setText={setText} tasks={tasks} setTasks={setTasks} />
    </form>
  );
}

Form.propTypes = {
  tasks: PropTypes.array.isRequired,
  setTasks: PropTypes.func.isRequired,
};
