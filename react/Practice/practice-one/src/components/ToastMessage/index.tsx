import { useEffect } from 'react'
import checkIcon from '../../assets/icons/check.svg'
import closeIcon from '../../assets/icons/close.svg'
import { TStatusVariant } from '../../types/variant'
import { Image, Typography } from '../common'
import { Message } from './ToastMessage.styled'
import useToast from '../hooks/useToast'

export interface IToastMessage {
  status: TStatusVariant
  message: string
  id?: string
}

export interface IToastMessageCardProps {
  duration?: number
  className?: string
}

const ToastMessage = ({ duration = 2900, className }: IToastMessageCardProps) => {
  const { toasts, removeToast } = useToast()
  useEffect(() => {
    toasts.forEach((toast) => {
      const timer = setTimeout(() => {
        if (!toast.id) return
        removeToast(toast.id)
      }, duration)
      return () => clearTimeout(timer)
    })
  }, [duration, removeToast, toasts])

  return toasts.map((item: IToastMessage, index: number) => (
    <Message key={item.id} $status={item.status} className={className} $index={index}>
      <Image src={item.status === 'success' ? checkIcon : closeIcon} alt={item.status} size='sm' />
      <Typography as='p'>{item.message}</Typography>
    </Message>
  ))
}

export default ToastMessage
