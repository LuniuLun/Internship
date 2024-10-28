import { TButtonVariant, TSizeVariant } from '../../../types/variant'
import ButtonStyled from './Button.styled'

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TButtonVariant
  size?: TSizeVariant
  icon?: string
  children?: React.ReactNode
  disabled?: boolean
  title: string
}

const Button = ({ variant, title, size = 'md', children, disabled = false, ...props }: IButtonProps) => (
  <ButtonStyled $variant={variant} $size={size} {...props} disabled={disabled}>
    {children}
    {title}
  </ButtonStyled>
)

export default Button
