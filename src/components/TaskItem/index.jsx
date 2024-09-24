import { listItem, check, checked, completed, text } from './styles.module.scss'

export default function TaskItem({ task, tasks, setTasks }){

  const { id, titulo, terminada } = task;

  function handleFinished(id){
    const taskList = tasks.map((task) => task.id === id ? {...task, terminada: !terminada} : task);
    return setTasks(taskList);
  }

  return (
    <li className={listItem}>
      <input 
      type='checkbox' 
      onClick={() => handleFinished(id)} 
      className={`${check} ${terminada ? checked : ''}`}/>
      <p className={`${text} ${terminada ? completed : ''}`}>{titulo}</p>
    </li>
  )
}
