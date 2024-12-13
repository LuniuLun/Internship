import { Box } from '@chakra-ui/react'
import { TableRow } from '.'
import colors from '@styles/variables/colors'

interface CustomCellProps {
  header: string
  row: TableRow
}

const CustomCell = ({ header, row }: CustomCellProps) => {
  if (header.toLowerCase() === 'role') {
    const isAdmin = row[header]?.toString().toLowerCase().includes('admin')
    return (
      <Box
        borderRadius='md'
        margin='auto'
        w='130px'
        py='6px'
        fontWeight='semibold'
        color={isAdmin ? colors.brand.white : colors.brand.blackTextSecondary}
        bgColor={isAdmin ? colors.brand.hoverBtnColor : colors.brand.secondary}
      >
        {row[header]}
      </Box>
    )
  }
  return row[header]
}

export default CustomCell
