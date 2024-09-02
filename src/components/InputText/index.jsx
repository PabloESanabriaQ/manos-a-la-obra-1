export default function InputText({ text, setText }){

  function handleText(e){
    return setText(e.target.value);
  }
  
  return <input type='text' name='nombre-tarea' id='add-task-input' autoFocus value={text} onChange={handleText}/>
}
