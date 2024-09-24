import TaskList from '../TaskList'
import Form from '../Form'
import { useState } from 'react'
import { container } from './styles.module.scss'

export default function TasksMain(){

  const [tasks, setTasks] = useState([]);

  return (
    <main className={container}>
      <Form tasks={tasks} setTasks={setTasks}/>
      <TaskList tasks={tasks} setTasks={setTasks} />
    </main>  
  )
}