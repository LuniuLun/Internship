import checkIcon from '../../assets/icons/check.svg'
import closeIcon from '../../assets/icons/close.svg'
import { TStatusVariant } from '../../types/variant'
import { Icon, Message } from './ToastMessage.styled'

export interface IToastMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  status: TStatusVariant
  message: string
}

const ToastMessage = ({ status, message, ...props }: IToastMessageProps) => {
  const getIcon = () => {
    return status === 'success' ? checkIcon : closeIcon
  }

  return (
    <Message $status={status} {...props}>
      <Icon src={getIcon()} alt={status} />
      <p className='normal-semiBold-text'>{message}</p>
    </Message>
  )
}

export default ToastMessage
