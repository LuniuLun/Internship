import { Select } from '@chakra-ui/react'
import { TBorderDirection } from '@type/variant'

interface SelectOption {
  value: string
  label: string
}

interface ICustomSelectProps {
  options: SelectOption[]
  border?: TBorderDirection
  placeholder?: string
  onChange?: (value: string) => void
}

const CustomSelect = ({ border = 'none', options, placeholder = 'Select an option', onChange }: ICustomSelectProps) => {
  return (
    <Select
      placeholder={placeholder}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        if (onChange) onChange(e.target.value)
      }}
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
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  )
}

export default CustomSelect
