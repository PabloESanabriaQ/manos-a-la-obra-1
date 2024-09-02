export default function TaskItem({ task, tasks, setTasks }){

  const { id, titulo, terminada } = task;

  function handleDelete(id){
    const taskList = tasks.filter((task) => task.id !== id);
    return setTasks(taskList);
  }

  function handleFinished(id){
    const taskList = tasks.map((task) => task.id === id ? {...task, terminada: !terminada} : task);
    return setTasks(taskList);
  }

  return (
    <li className='list-item'>
      <input type='checkbox' onClick={() => handleFinished(id)} className={terminada ? 'check checked' : 'check'}/>
      <p  className={terminada ? 'text completed' : 'text'}>{titulo}</p>
      <button className='trash' onClick={() => handleDelete(id)}/>
    </li>
  )
}
