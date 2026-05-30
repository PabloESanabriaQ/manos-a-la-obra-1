import { useTranslation } from "react-i18next";
import ListContainerComponent from "../../components/ListContainerComponent";
import useAllProjects from "../../services/getAllProjects";
import LoadingSpinner from "../../components/LoadingSpinner";
import styles from "./styles.module.scss";

export default function MyProjectsView() {
  const { data, loading, error } = useAllProjects();
  const { t } = useTranslation();

  if (loading) return <LoadingSpinner />;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <ListContainerComponent data={data} title={t("common.projects")} path="project" />
    </div>
  );
}
