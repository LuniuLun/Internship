import { useContext } from 'react'
import { IToastMessage } from '@components/ToastMessage'
import { ToastContext } from '@components/ToastMessage/ToastProvider'

const useToast = () => {
  const { toasts, setToasts } = useContext(ToastContext)

  const addToast = (newToast: IToastMessage) => {
    if (!newToast.id) newToast.id = Date.now().toString()
    setToasts((prev) => {
      if (prev.find((toast) => toast.id === newToast.id)) return prev
      return [newToast, ...prev]
    })
  }
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return {
    toasts,
    addToast,
    removeToast
  }
}

export default useToast
