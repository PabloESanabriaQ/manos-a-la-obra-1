import { useParams } from "react-router-dom"
import useEpicsByProjectId from "../../services/getEpicsByProjectId"
import ListContainerComponent from "../../components/ListContainerComponent"
import styles from "./styles.module.scss";

export default function ProjectView() {

  const { idProyecto } = useParams();

  const response = useEpicsByProjectId(idProyecto);

if(!response) return <div className={styles.loading}>Loading...</div>

  return (
    <div className={styles.container}>
      <ListContainerComponent data={response.data} title="Epics" path="epic" />
    </div>
  )
  
}
