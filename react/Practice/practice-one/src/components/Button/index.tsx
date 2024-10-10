import { IButtonProps } from '../../types/common'
import styles from './Button.module.scss'

function Button({ title }: IButtonProps) {
  return <button className={styles.btn}>{title}</button>
}

export default Button
