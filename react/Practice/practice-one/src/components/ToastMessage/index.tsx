import checkIcon from '../../assets/icons/check.svg'
import closeIcon from '../../assets/icons/close.svg'
import { TStatusVariant } from '../../types/variant'
import styles from './ToastMessage.module.css'

export interface IToastMessageProps {
  status: TStatusVariant
  message: string
}

function ToastMessage({ status, message }: IToastMessageProps) {
  const mode = styles[`message--${status}`]

  const getIcon = () => {
    return status === 'success' ? checkIcon : closeIcon
  }

  return (
    <div className={`${styles.message} ${mode}`}>
      <img src={getIcon()} alt={status} className={styles.icon} />
      <p className='normal-semiBold-text'>{message}</p>
    </div>
  )
}

export default ToastMessage
