import React from 'react'
import { TextStyled } from './Typography.styled'

export interface ITypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'normal-bold' | 'normal-medium' | 'normal-thin' | 'large-bold' | 'error-message'
  as?: keyof JSX.IntrinsicElements
}

const Typography = ({ variant = 'normal-medium', as = 'p', children, ...props }: ITypographyProps) => {
  return (
    <TextStyled as={as} variant={variant} {...props}>
      {children}
    </TextStyled>
  )
}

export default Typography
