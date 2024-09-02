import TaskItem from '../TaskItem'

export default function TaskList({ tasks, setTasks }){

  if(tasks.length == 0) return <>Ingrese una tarea para comenzar!</>
  
  return (
        <ul id='list'>
          {
          tasks.map(
            task => {
              return <TaskItem key={task.id} tasks={tasks} task={task} setTasks={setTasks} />
            }
            )
          }
        
        </ul>
  )
}
