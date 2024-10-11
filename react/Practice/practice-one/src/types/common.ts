import { TButtonVariant } from './variant'

export interface IButtonProps {
  variant?: TButtonVariant
  // size?: 'small' | 'medium' | 'large'
  title: string
  onClick?: () => void
}
