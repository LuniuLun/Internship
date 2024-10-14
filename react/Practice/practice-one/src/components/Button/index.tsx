import { TButtonVariant, TSizeVariant } from '../../types/variant'
import ButtonStyled from './Button.styled'

export interface IButtonProps {
  variant?: TButtonVariant
  size?: TSizeVariant
  icon?: string
  title: string
  onClick?: () => void
}

const Button = ({ variant, title, size = 'md', icon, ...props }: IButtonProps) => (
  <ButtonStyled variant={variant} size={size} {...props} className='normal-semiBold-txtBtn'>
    {icon && <img src={icon} alt={title} style={{ marginRight: '8px' }} />}
    {title}
  </ButtonStyled>
)

export default Button
