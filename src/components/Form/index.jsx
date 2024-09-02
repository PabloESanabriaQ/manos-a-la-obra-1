import { useState } from 'react'
import InputText from '../InputText'
import SubmitButton from '../SubmitButton'

export default function Form({tasks, setTasks}){

  const [text, setText] = useState("");

  return (
    <form id='form'>
      <InputText text={text} setText={setText} />
      <SubmitButton text={text} setText={setText} tasks={tasks} setTasks={setTasks}/>
    </form>
  )
}
