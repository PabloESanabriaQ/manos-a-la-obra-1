import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ListContainerComponent from "../../components/ListContainerComponent";
import useTasksByUSId from "../../services/getTasksByUSId";
import styles from "./styles.module.scss";

export default function UserStoryView() {
  const { idHistoriaDeUsuario } = useParams();
  const { data, loading, error } = useTasksByUSId(idHistoriaDeUsuario);
  const { t } = useTranslation();

  if (loading) return <div className={styles.loading}>{t("common.loading")}</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <ListContainerComponent data={data} title={t("common.tasks")} path="tasks" />
    </div>
  );
}
