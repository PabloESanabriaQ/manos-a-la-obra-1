import ListContainerComponent from "../../components/ListContainerComponent";
import useAllProjects from "../../services/getAllProjects";
import styles from "./styles.module.scss";

export default function MyProjectsView() {
  const response = useAllProjects();

  if (!response) {
    return <>Loading...</>;
  }

  const projects = response.data;

  return (
    <div className={styles.container}>
      <ListContainerComponent data={projects} title="Projects" path="project" />
    </div>
  );
}
