
import TaskList from '../TaskList'
import Form from '../Form'
import { tasks } from '../../data/tasks'

export default function TasksMain(){
  return (
    <main>
      <Form />
      <TaskList tasks={tasks} />
    </main>  
  )
}