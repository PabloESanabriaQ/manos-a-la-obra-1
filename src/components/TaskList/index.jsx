import TaskItem from '../TaskItem'
import { list } from './styles.module.scss'

export default function TaskList({ tasks, setTasks }){

  if(tasks.length == 0) return <>Ingrese una tarea para comenzar!</>
  
  return (
        <ul className={list}>
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
