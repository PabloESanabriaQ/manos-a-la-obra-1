import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useEpicsByProjectId from "../../services/getEpicsByProjectId";
import ListContainerComponent from "../../components/ListContainerComponent";
import styles from "./styles.module.scss";

export default function ProjectView() {
  const { idProyecto } = useParams();
  const { data, loading, error } = useEpicsByProjectId(idProyecto);
  const { t } = useTranslation();

  if (loading) return <div className={styles.loading}>{t("common.loading")}</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <ListContainerComponent data={data} title={t("common.epics")} path="epic" />
    </div>
  );
}
