import { useParams } from "react-router-dom";
import useUSByEpicId from "../../services/getUSByEpicId";
import ListContainerComponent from "../../components/ListContainerComponent";
import styles from "./styles.module.scss";

export default function EpicView() {
  const { idEpica } = useParams();
  const { data, loading, error } = useUSByEpicId(idEpica);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <ListContainerComponent data={data} title="User Stories" path="userStory" />
    </div>
  );
}
