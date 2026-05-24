import useAllStories from "../../services/getAllStories";
import ListContainerComponent from "../../components/ListContainerComponent";
import styles from "./styles.module.scss";

export default function MyStoriesView() {
  const { data, loading, error } = useAllStories();

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <ListContainerComponent data={data} title="My Stories" path="userStory" />
    </div>
  );
}
