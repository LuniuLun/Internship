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
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

const CustomTable = ({ title, data, onEdit, onDelete, ...props }: CustomTableProps) => {
  const headers = data.length > 0 ? Object.keys(data[0]) : []
  const hasActions = Boolean(onEdit || onDelete)

  const filteredHeaders = headers.filter((header) => header !== 'id')

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
          {filteredHeaders.map((header, index) => (
            <Th
              key={header}
              borderBottom={`2px solid ${colors.brand.secondary}`}
              padding={5}
              fontSize='md'
              textTransform='capitalize'
              textAlign={index === 0 ? 'left' : 'center'}
            >
              {header.replace(/([a-z])([A-Z])/g, '$1 $2')}
            </Th>
          ))}
          {hasActions && (
            <Th
              textAlign='center'
              w='100px'
              padding={5}
              fontSize='md'
              textTransform='capitalize'
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
            {filteredHeaders.map((header, index) => (
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
                      onClick={() => onEdit && onEdit(row.id as string)}
                    />
                  )}
                  {onDelete && (
                    <IconButton
                      aria-label='Delete'
                      bgColor={colors.brand.white}
                      icon={<BinIcon />}
                      size='sm'
                      colorScheme='red'
                      onClick={() => onDelete && onDelete(row.id as string)}
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
