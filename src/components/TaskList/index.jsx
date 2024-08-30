import TaskItem from '../TaskItem'

export default function TaskList({ tasks }){
  
  return (
        <ul id='list'>
          {
          tasks.map(
            task => {
              return <TaskItem key={task.id} task={task} />
            }
            )
          }
        
        </ul>
  )
}
