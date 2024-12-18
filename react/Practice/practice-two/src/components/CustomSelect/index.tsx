import { Select } from '@chakra-ui/react'
import { TBorderDirection } from '@type/variant'

export interface SelectOption<T> {
  value: T
  label: string
}

interface ICustomSelectProps<T> {
  options: SelectOption<T>[]
  border?: TBorderDirection
  fontSize?: string
  placeholder?: string
  onChange?: (value: T) => void
}

const CustomSelect = <T extends string | number>({
  fontSize,
  border = 'none',
  options,
  placeholder,
  onChange
}: ICustomSelectProps<T>) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (onChange) {
      onChange(value as T)
    }
  }

  return (
    <Select
      maxW='150px'
      fontWeight='semibold'
      placeholder={placeholder}
      onChange={handleChange}
      fontSize={fontSize ? fontSize : ''}
      variant={border === 'bottom' ? 'flushed' : 'filled'}
      sx={{
        borderBottom: border === 'bottom' ? '1px solid black' : 'none',
        option: {
          backgroundColor: 'gray.100',
          color: 'gray.800'
        },
        'option:hover': {
          backgroundColor: 'blue.500',
          color: 'white'
        }
      }}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  )
}

export default CustomSelect
