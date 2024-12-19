import { Table, Thead, Tbody, Tr, Th, Td, IconButton, Flex, TableCaption, TableProps } from '@chakra-ui/react'
import { BinIcon, PenIcon } from '@assets/icons'
import colors from '@styles/variables/colors'
import CustomCell from './CustomCell'

export interface TableRow {
  [key: string]: string | number | boolean | React.ReactNode
}

interface CustomTableProps extends TableProps {
  title?: string
  data: TableRow[]
  onEdit?: (row: TableRow) => void
  onDelete?: (row: TableRow) => void
}

const CustomTable = ({ title, data, onEdit, onDelete, ...props }: CustomTableProps) => {
  const headers = data.length > 0 ? Object.keys(data[0]) : []
  const hasActions = Boolean(onEdit || onDelete)

  return (
    <Table borderRadius='lg' {...props}>
      {title && (
        <TableCaption
          placement='top'
          marginTop={0}
          padding={5}
          textAlign='left'
          color={colors.brand.blackTextPrimary}
          fontSize='1.0625rem'
          fontWeight='bold'
          bgColor={colors.brand.white}
        >
          {title}
        </TableCaption>
      )}
      <Thead>
        <Tr bgColor={colors.brand.secondary} color={colors.brand.blackTextSecondary}>
          {headers.map((header, index) => (
            <Th
              key={header}
              borderBottom={`2px solid ${colors.brand.secondary}`}
              padding={5}
              fontSize='md'
              textAlign={index === 0 ? 'left' : 'center'}
            >
              {header}
            </Th>
          ))}
          {hasActions && (
            <Th
              textAlign='center'
              w='100px'
              padding={5}
              fontSize='md'
              borderBottom={`2px solid ${colors.brand.secondary}`}
            >
              Action
            </Th>
          )}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((row, rowIndex) => (
          <Tr key={rowIndex} fontSize='sm' color={colors.brand.blackTextPrimary}>
            {headers.map((header, index) => (
              <Td
                key={header}
                borderBottom={`2px solid ${colors.brand.secondary}`}
                textAlign={index === 0 ? 'left' : 'center'}
                bgColor={colors.brand.white}
              >
                {CustomCell({ header, row })}
              </Td>
            ))}
            {hasActions && (
              <Td w='100px' borderBottom={`2px solid ${colors.brand.secondary}`} bgColor={colors.brand.white}>
                <Flex gap={2}>
                  {onEdit && (
                    <IconButton
                      aria-label='Edit'
                      bgColor={colors.brand.white}
                      icon={<PenIcon />}
                      size='sm'
                      onClick={() => onEdit(row)}
                    />
                  )}
                  {onDelete && (
                    <IconButton
                      aria-label='Delete'
                      bgColor={colors.brand.white}
                      icon={<BinIcon />}
                      size='sm'
                      colorScheme='red'
                      onClick={() => onDelete(row)}
                    />
                  )}
                </Flex>
              </Td>
            )}
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default CustomTable
