import ListContainerComponent from "../../components/ListContainerComponent";
import { useParams } from "react-router-dom";
import useTasksByUSId from "../../services/getTasksByUSId";
import styles from "./styles.module.scss";

export default function UserStoryView() {
  const { idHistoriaDeUsuario } = useParams();
  const { data, loading, error } = useTasksByUSId(idHistoriaDeUsuario);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <ListContainerComponent data={data} title="Tasks" path="tasks" />
    </div>
  );
}
