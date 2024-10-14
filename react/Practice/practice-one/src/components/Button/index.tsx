import { TButtonVariant, TSizeVariant } from '../../types/variant'
import ButtonStyled from './Button.styled'

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TButtonVariant
  size?: TSizeVariant
  icon?: string
  title: string
}

const Button = ({ variant, title, size = 'md', icon, ...props }: IButtonProps) => (
  <ButtonStyled variant={variant} size={size} {...props}>
    {icon && <img src={icon} alt={title} style={{ marginRight: '8px' }} />}
    {title}
  </ButtonStyled>
)

export default Button
