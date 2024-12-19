import { Select, SelectProps } from '@chakra-ui/react'
import { useState } from 'react'
import { TBorderDirection } from '@type/variant'

export interface SelectOption<T> {
  value: T
  label: string
}

interface ICustomSelectProps<T> extends SelectProps {
  options: SelectOption<T>[]
  border?: TBorderDirection
}

const CustomSelect = <T extends string | number>({
  border = 'none',
  options,
  placeholder,
  onChange,
  ...props
}: ICustomSelectProps<T>) => {
  const [selectedValue, setSelectedValue] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSelectedValue(value)
    if (onChange) {
      onChange(e)
    }
  }

  return (
    <Select
      maxW='150px'
      fontWeight='semibold'
      value={selectedValue}
      onChange={handleChange}
      variant={border === 'bottom' ? 'flushed' : 'filled'}
      sx={{
        borderBottom: border === 'bottom' ? '1px solid black' : ''
      }}
      {...props}
    >
      <option value='' disabled hidden>
        {selectedValue || placeholder || 'Select'}
      </option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  )
}

export default CustomSelect
