export default function TaskItem({task}){

  const { terminada, titulo } = task;

  return (
    <li className='list-item'>
      <input type='checkbox' className={terminada ? 'check checked' : 'check'}/>
      <p  className={terminada ? 'text completed' : 'text'}>{titulo}</p>
      <button className='trash'/>
    </li>
  )
}
