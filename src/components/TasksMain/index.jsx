
import TaskList from '../TaskList'
import Form from '../Form'
import { useState } from 'react'

export default function TasksMain(){

  const [tasks, setTasks] = useState([]);

  return (
    <main>
      <Form tasks={tasks} setTasks={setTasks}/>
      <TaskList tasks={tasks} setTasks={setTasks} />
    </main>  
  )
}