import EmptyListComponent from "../EmptyListComponent";
import ListComponent from "../ListComponent";
import TitleComponent from "../TitleComponent";
import styles from "./styles.module.scss";

export default function ListContainerComponent({ title, data, path }) {

  return (
    <section className={styles.container}>
      <TitleComponent title={title}/>
      {
        data != null && data.length === 0 
        ? <EmptyListComponent />
        : <ListComponent data={data} path={path} />
      }
    </section>
  )
}