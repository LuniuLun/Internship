import React, { useState } from 'react'
import { TSizeVariant } from '@type/variant'
import { Input, Wrapper } from './TextField.styled'
import { Typography } from '../common'

export interface ITextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string
  dimension?: TSizeVariant
  label?: string
  errorMessage?: string
}

const TextField = ({ value, name, label, errorMessage, dimension = 'lg', onChange, ...props }: ITextFieldProps) => {
  const [valueInput, setValueInput] = useState(value)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value)
    onChange?.(e)
  }
  return (
    <Wrapper>
      {label && (
        <Typography as='label' htmlFor={name} style={{ marginBottom: '8px', color: 'var(--white-text-1)' }}>
          {label}
        </Typography>
      )}
      <Input
        name={name}
        value={valueInput}
        className='normal-thin-text'
        onChange={handleChange}
        $dimension={dimension}
        {...props}
      />
      <Typography variant='error-message'>{errorMessage || ''}</Typography>
    </Wrapper>
  )
}

export default TextField
