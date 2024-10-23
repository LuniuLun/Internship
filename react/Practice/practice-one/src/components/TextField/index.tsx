import React, { useState } from 'react'
import { TSizeVariant } from '../../types/variant'
import { Input } from './TextField.styled'

export interface ITextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string
  dimension?: TSizeVariant
}

const TextField = ({ value, name, dimension = 'lg', onChange, ...props }: ITextFieldProps) => {
  const [valueInput, setValueInput] = useState(value)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value)
    onChange?.(e)
  }
  return (
    <Input
      name={name}
      value={valueInput}
      className='normal-thin-text'
      onChange={handleChange}
      $dimension={dimension}
      {...props}
    />
  )
}

export default TextField
