import React, { useState } from 'react'
import { TSizeVariant } from '../../types/variant'
import { ErrorMessage, Input, Label, Wrapper } from './TextField.styled'

export interface ITextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string
  dimension?: TSizeVariant
  label?: string
  errorMessage?: string
}

const TextField = ({ value, name, label, errorMessage, dimension = 'lg', ...props }: ITextFieldProps) => {
  const [valueInput, setValueInput] = useState(value)

  return (
    <Wrapper>
      {label && (
        <Label htmlFor={name} className='normal-medium-text'>
          {label}
        </Label>
      )}
      <Input
        name={name}
        value={valueInput}
        dimension={dimension}
        className='normal-thin-text'
        onChange={(e) => setValueInput(e.target.value)}
        {...props}
      />
      <ErrorMessage className='normal-medium-text'>{errorMessage}</ErrorMessage>
    </Wrapper>
  )
}

export default TextField
