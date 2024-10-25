import checkIcon from '../../assets/icons/check.svg'
import closeIcon from '../../assets/icons/close.svg'
import { TStatusVariant } from '../../types/variant'
import { Typography } from '../common'
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
      <Typography as='p'>{message}</Typography>
    </Message>
  )
}

export default ToastMessage
