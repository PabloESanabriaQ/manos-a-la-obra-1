import ListContainerComponent from "../../components/ListContainerComponent";
import { useParams } from "react-router-dom";
import getTaskById from "../../services/getTaskById";
import styles from "./styles.module.scss";

export default function TaskView(){

  const { idTarea } = useParams();

  const response = getTaskById(idTarea);

if(!response) return <div className={styles.loading}>Loading...</div>
  
  return  (
    <div className={styles.container}>
      <ListContainerComponent data={response.data} title="Task" path="task" />
    </div>
  )
}
