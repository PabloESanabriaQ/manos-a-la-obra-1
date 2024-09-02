export default function SubmitButton({text, setText, tasks, setTasks}){

  function handleSetTasks(e){
    e.preventDefault();
    setText("");
    const newTask = {
      id: Date.now(),
      titulo: text,
      terminada: false
    };
    return setTasks([newTask, ...tasks]);
  }

  return <input type='submit' value='ADD' id='add-task-button' onClick={handleSetTasks}/>
}
