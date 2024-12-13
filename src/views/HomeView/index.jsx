import styles from "./styles.module.scss";

export default function HomeView(){

  const user = JSON.parse(localStorage.getItem("user"));

  if(!user){
    return <h1 className={styles.h1}>Hi! Welcome to the home page!</h1>
  }
  
  return (
    <section className={styles.main}>
        <h1 className={styles.h1}>
          <span className={styles.span}>Welcome {user.name.first}</span>! It's a pleasure to have you here!
        </h1>
        <p>Aquí irá un listado de proyectos por orden de última edición, intentaré que sea paginado</p>
    </section>
  )
}