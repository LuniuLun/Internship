import { useEffect } from 'react'
import checkIcon from '../../assets/icons/check.svg'
import closeIcon from '../../assets/icons/close.svg'
import { TStatusVariant } from '../../types/variant'
import { Typography } from '../common'
import { Icon, Message } from './ToastMessage.styled'

export interface IToastMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  status: TStatusVariant
  message: string
  setShowNotification: (value: boolean) => void
  duration?: number
}

const ToastMessage = ({ status, message, duration = 2900, setShowNotification, ...props }: IToastMessageProps) => {
  const getIcon = () => {
    return status === 'success' ? checkIcon : closeIcon
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false)
    }, duration)
    return () => clearTimeout(timer)
  }, [duration])

  return (
    <Message $status={status} {...props}>
      <Icon src={getIcon()} alt={status} />
      <Typography as='p'>{message}</Typography>
    </Message>
  )
}

export default ToastMessage
