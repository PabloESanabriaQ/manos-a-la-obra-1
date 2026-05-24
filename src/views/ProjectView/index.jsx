import { useParams } from "react-router-dom";
import useEpicsByProjectId from "../../services/getEpicsByProjectId";
import ListContainerComponent from "../../components/ListContainerComponent";
import styles from "./styles.module.scss";

export default function ProjectView() {
  const { idProyecto } = useParams();
  const { data, loading, error } = useEpicsByProjectId(idProyecto);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <ListContainerComponent data={data} title="Epics" path="epic" />
    </div>
  );
}
