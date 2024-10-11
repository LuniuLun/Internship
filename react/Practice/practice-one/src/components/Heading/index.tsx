import { IHeadingProps } from '../../types/common'
import styles from './Heading.module.css'

function Heading({ title }: IHeadingProps) {
  return <h1 className={`${styles.heading} heading-h1-text`}>{title}</h1>
}

export default Heading
