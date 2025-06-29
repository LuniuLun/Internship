import { Checkbox, Flex } from '@chakra-ui/react'
import { TableRow } from '.'
import colors from '@styles/variables/colors'
import { memo } from 'react'

interface CustomCellProps {
  header: string
  row: TableRow
}

const CustomCell = ({ header, row }: CustomCellProps) => {
  const value = row[header]

  if (typeof value === 'boolean') {
    return <Checkbox isChecked={value} disabled aria-label={`Cell active status for ${row.name}`} />
  }

  if (!value) return ''

  if (value instanceof Date) {
    return value.toISOString().split('T')[0]
  }

  const lowerHeader = header.toLowerCase()

  if (lowerHeader === 'role' || lowerHeader === 'modulepermission') {
    const isAdmin = value?.toString().toLowerCase().includes('admin')

    return (
      <Flex
        justifyContent='center'
        borderRadius='md'
        margin={lowerHeader === 'role' ? 'auto' : 'unset'}
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

  return value
}

export default memo(CustomCell)
