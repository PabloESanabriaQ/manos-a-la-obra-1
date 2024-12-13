import styles from "./styles.module.scss"
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function ListItemComponent({ item, path }) {

  const [hidden, setHidden] = useState(true);

  function handleMouseEnter(){
    setHidden(false);
  }

  function handleMouseLeave(){
    setHidden(true);
  }

  return (
    <li className={styles.listItem} 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
      <Link className={styles.link} to={`/${path}/${item._id}`}>
        <div className={styles.item}>
          <span>{item.icon}</span>
          <p className={styles.text}>{item.name}</p>
        </div>
        <p className={hidden ? `${styles.hidden}` : `${styles.description}`}>
          {item.description}
        </p>
      </Link>
    </li>
  )
}