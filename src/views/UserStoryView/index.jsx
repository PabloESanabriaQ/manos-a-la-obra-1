import ListContainerComponent from "../../components/ListContainerComponent";
import { useParams } from "react-router-dom";
import useTasksByUSId from "../../services/getTasksByUSId";
import styles from "./styles.module.scss";

export default function UserStoryView() {
  const { idHistoriaDeUsuario } = useParams();

  const response = useTasksByUSId(idHistoriaDeUsuario);

  if (!response) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <ListContainerComponent data={response.data} title="Tasks" path="tasks" />
    </div>
  );
}
