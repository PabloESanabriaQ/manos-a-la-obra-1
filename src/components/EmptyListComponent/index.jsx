import styles from "./styles.module.scss";

export default function EmptyListComponent() {
  return (
    <section className={styles.emptyList}>
      <p>Nothing to see here... Add an item to start!</p>
    </section>
  );
}
