import React, { forwardRef } from 'react'
import { TSizeVariant } from '@type/variant'
import { Input, Wrapper } from './TextField.styled'
import { Typography } from '../common'

export interface ITextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string
  dimension?: TSizeVariant
  label?: string
  errorMessage?: string
}

const TextField = forwardRef<HTMLInputElement, ITextFieldProps>(
  ({ name, label, errorMessage, dimension = 'lg', ...props }, ref) => {
    return (
      <Wrapper>
        {label && (
          <Typography as='label' htmlFor={name} style={{ marginBottom: '8px', color: 'var(--white-text-1)' }}>
            {label}
          </Typography>
        )}
        <Input ref={ref} name={name} className='normal-thin-text' $dimension={dimension} {...props} />
        <Typography variant='error-message'>{errorMessage}</Typography>
      </Wrapper>
    )
  }
)

export default TextField
