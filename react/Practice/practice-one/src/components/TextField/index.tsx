import React, { useState } from 'react'
import { TSizeVariant } from '../../types/variant'
import { Input, Wrapper } from './TextField.styled'
import Label from '../Label'
import ErrorMessage from '../ErrorMessage'

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
      {label && <Label htmlFor={name} title={label}></Label>}
      <Input
        name={name}
        value={valueInput}
        className='normal-thin-text'
        onChange={handleChange}
        $dimension={dimension}
        {...props}
      />
      <ErrorMessage className='normal-medium-text' title={errorMessage || ''} />
    </Wrapper>
  )
}

export default TextField
