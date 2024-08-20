import trashCan from './assets/trash-can.svg'
import './App.css'

function App() {

  return (
    <>
      <header><h1 id='title'>Lista de Tareas de Pablo</h1></header>
      <main>
        <form id='form'>
          <input type='text' name='nombre-tarea' id='add-task-input' />
          <input type='submit' value='ADD' id='add-task-button'/>
        </form>
        <ul id='list'>
          <li className='list-item'><input type='checkbox' className='check'/><p className='text'>Task N</p><button className='trash'/></li>
          <li className='list-item'><input type='checkbox' className='check'/><p className='text'>Task N-1</p><button className='trash'/></li>
          <li className='list-item'><input type='checkbox' className='check checked'/><p className='text completed'>Completed Task N-2</p><button className='trash'/></li>
          <li className='list-item'><input type='checkbox' className='check'/><p className='text'>Task K</p><button className='trash'/></li>
          <li className='list-item'><input type='checkbox' className='check'/><p className='text'>Task 2</p><button className='trash'/></li>
          <li className='list-item'><input type='checkbox' className='check checked'/><p className='text completed'>Completed Task 1</p><button className='trash'/></li>
        </ul>
      </main>  
    </>
  )
}

export default App
