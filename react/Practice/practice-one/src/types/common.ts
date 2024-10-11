import { TButtonVariant, TSizeVariant } from './variant'

export interface IButtonProps {
  variant?: TButtonVariant
  // size?: 'small' | 'medium' | 'large'
  title: string
  onClick?: () => void
}

export interface ITextFieldProps {
  name: string
  size: TSizeVariant
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  error?: string
}
