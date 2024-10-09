import styles from './Heading.module.css'

interface IHeading {
  title: string
}

function Heading({ title }: IHeading) {
  return (
    <div className={styles.heading}>
      <h2 className={styles.title}>{title}</h2>
    </div>
  )
}

export default Heading
