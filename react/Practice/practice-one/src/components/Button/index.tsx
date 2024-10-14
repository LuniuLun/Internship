import styled, { css } from 'styled-components'
import { TButtonVariant, TSizeVariant } from '../../types/variant'

export interface IButtonProps {
  variant?: TButtonVariant
  size?: TSizeVariant
  icon?: string
  title: string
  onClick?: () => void
}

const ButtonStyled = styled.button<{ variant?: string; size?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 8px;
  padding: 14px;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;

  @media (max-width: 768px) {
    padding: 8px;
  }

  ${({ variant }) =>
    variant === 'primary' &&
    css`
      border: 1px solid var(--orange-color-1);
      color: var(--orange-color-1);

      &:hover {
        background-color: var(--orange-color-1);
        color: var(--white-text-1);
        box-shadow: var(--shadow-hover-btn);
      }
    `}

  ${({ variant }) =>
    variant === 'tertiary' &&
    css`
      justify-content: flex-start;
      border: var(--dark-thin-border);
      background-color: var(--dark-bg-2);
      color: var(--white-text-1);

      &:hover {
        background-color: var(--orange-color-1);
        color: var(--white-text-1);
        box-shadow: var(--shadow-hover-btn);
      }
    `}

  ${({ size }) =>
    size === 'md' &&
    css`
      width: 180px;
    `}

  ${({ size }) =>
    size === 'sm' &&
    css`
      width: 160px;
    `}
`

const Button = ({ variant, title, size = 'md', icon, ...props }: IButtonProps) => (
  <ButtonStyled variant={variant} size={size} {...props} className='normal-semiBold-txtBtn'>
    {icon && <img src={icon} alt={title} style={{ marginRight: '8px' }} />}
    {title}
  </ButtonStyled>
)

export default Button
