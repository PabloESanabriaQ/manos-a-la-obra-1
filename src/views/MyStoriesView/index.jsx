import { useTranslation } from "react-i18next";
import useAllStories from "../../services/getAllStories";
import ListContainerComponent from "../../components/ListContainerComponent";
import LoadingSpinner from "../../components/LoadingSpinner";
import styles from "./styles.module.scss";

export default function MyStoriesView() {
  const { data, loading, error } = useAllStories();
  const { t } = useTranslation();

  if (loading) return <LoadingSpinner />;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <ListContainerComponent data={data} title={t("common.myStories")} path="userStory" />
    </div>
  );
}
