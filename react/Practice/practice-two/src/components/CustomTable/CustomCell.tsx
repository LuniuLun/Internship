import { Checkbox, Flex } from '@chakra-ui/react'
import { TableRow } from '.'
import colors from '@styles/variables/colors'

interface CustomCellProps {
  header: string
  row: TableRow
}

const CustomCell = ({ header, row }: CustomCellProps) => {
  const value = row[header]

  if (!value && value !== false) return ''

  if (value instanceof Date) {
    return value.toISOString().split('T')[0]
  }

  if (header.toLowerCase() === 'role' || header.toLowerCase() === 'modulepermission') {
    const isAdmin = value?.toString().toLowerCase().includes('admin')

    return (
      <Flex
        justifyContent='center'
        borderRadius='md'
        margin={header.toLowerCase() === 'role' ? 'auto' : 'unset'}
        w='130px'
        py='6px'
        fontWeight='semibold'
        color={isAdmin ? colors.brand.white : colors.brand.blackTextSecondary}
        bgColor={isAdmin ? colors.brand.hoverBtnColor : colors.brand.secondary}
      >
        {value}
      </Flex>
    )
  }

  if (typeof value === 'boolean') {
    return <Checkbox isChecked={value} isReadOnly aria-label={`Cell active status for ${row.name}`} />
  }

  return value
}

export default CustomCell
