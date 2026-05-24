import ListContainerComponent from "../../components/ListContainerComponent";
import { useParams } from "react-router-dom";
import useTaskById from "../../services/getTaskById";
import styles from "./styles.module.scss";

export default function TaskView() {
  const { idTarea } = useParams();
  const { data, loading, error } = useTaskById(idTarea);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <ListContainerComponent data={data} title="Task" path="task" />
    </div>
  );
}
