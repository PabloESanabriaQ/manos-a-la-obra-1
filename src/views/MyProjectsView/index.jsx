import ListContainerComponent from "../../components/ListContainerComponent";
import useAllProjects from "../../services/getAllProjects";
import styles from "./styles.module.scss";

export default function MyProjectsView() {
  const { data, loading, error } = useAllProjects();

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <ListContainerComponent data={data} title="Projects" path="project" />
    </div>
  );
}
