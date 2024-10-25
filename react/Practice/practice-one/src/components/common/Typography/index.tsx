import React from 'react'
import { TextStyled } from './Typography.styled'

export interface ITypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'normal-semiBold' | 'normal-medium' | 'normal-thin' | 'large-semiBold' | 'error-message' // Add error-message variant
  as?: keyof JSX.IntrinsicElements
  className?: string
}

const Text = ({ variant = 'normal-medium', as = 'p', children, className, ...props }: ITypographyProps) => {
  return (
    <TextStyled as={as} variant={variant} className={className} {...props}>
      {children}
    </TextStyled>
  )
}

export default Text
