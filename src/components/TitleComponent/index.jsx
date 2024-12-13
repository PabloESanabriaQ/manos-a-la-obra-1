import styles from "./styles.module.scss"

export default function TitleComponent({ title }) {
  return (
    <h1 className={styles.title}>{title}</h1>
  )
}