import { IToastMessage } from './index'
import React, { useState, useMemo, createContext } from 'react'

interface IToastContext {
  toasts: IToastMessage[]
  setToasts: React.Dispatch<React.SetStateAction<IToastMessage[]>>
}

export const ToastContext = createContext<IToastContext>({
  toasts: [],
  setToasts: () => {}
})

interface IToastProviderProps {
  children: React.ReactNode
}

const ToastProvider = ({ children }: IToastProviderProps) => {
  const [toasts, setToasts] = useState<IToastMessage[]>([])
  const memoizedValue = useMemo(() => ({ toasts, setToasts }), [toasts])

  return <ToastContext.Provider value={memoizedValue}>{children}</ToastContext.Provider>
}

export default React.memo(ToastProvider)
