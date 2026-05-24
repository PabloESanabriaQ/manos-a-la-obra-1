import { useParams } from "react-router-dom";
import useUSByEpicId from "../../services/getUSByEpicId";
import ListContainerComponent from "../../components/ListContainerComponent";
import styles from "./styles.module.scss";

export default function EpicView() {
  const { idEpica } = useParams();

  const response = useUSByEpicId(idEpica);

  if (!response) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <ListContainerComponent data={response.data} title="User Stories" path="userStory" />
    </div>
  );
}
