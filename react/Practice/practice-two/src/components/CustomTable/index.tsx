import { Table, Thead, Tbody, Tr, Th, Td, IconButton, Flex, Button, TableCaption } from '@chakra-ui/react'
import { BinIcon, PenIcon } from '@assets/icons'
import colors from '@styles/variables/colors'

export interface TableRow {
  [key: string]: string | number | boolean | React.ReactNode
}

interface CustomTableProps {
  title?: string
  data: TableRow[]
  onEdit: (row: TableRow) => void
  onDelete: (row: TableRow) => void
}

const CustomTable = ({ title, data, onEdit, onDelete }: CustomTableProps) => {
  const headers = data.length > 0 ? Object.keys(data[0]) : []

  return (
    <Table>
      <TableCaption
        placement='top'
        marginTop={0}
        padding={5}
        textAlign={'left'}
        color={colors.brand.blackTextPrimary}
        fontSize={'1.0625rem'}
        fontWeight={'bold'}
      >
        {title}
      </TableCaption>
      <Thead>
        <Tr bgColor={colors.brand.secondary} color={colors.brand.blackTextSecondary}>
          {headers.map((header, index) => (
            <Th
              key={header}
              borderBottom={`2px solid ${colors.brand.secondary}`}
              padding={5}
              textAlign={index === 0 ? 'left' : 'center'}
            >
              {header}
            </Th>
          ))}
          <Th textAlign={'center'} w={'100px'} padding={5} borderBottom={`2px solid ${colors.brand.secondary}`}>
            Action
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((row, rowIndex) => (
          <Tr key={rowIndex}>
            {headers.map((header, index) => (
              <Td
                key={header}
                borderBottom={`2px solid ${colors.brand.secondary}`}
                textAlign={index === 0 ? 'left' : 'center'}
              >
                {header.toLowerCase() === 'role' ? (
                  <Button
                    w='111px'
                    size='sm'
                    variant={row[header]?.toString().toLowerCase().includes('admin') ? 'primary' : 'secondary'}
                  >
                    {row[header]}
                  </Button>
                ) : (
                  row[header]
                )}
              </Td>
            ))}
            <Td w={'100px'} borderBottom={`2px solid ${colors.brand.secondary}`} bgColor={colors.brand.white}>
              <Flex gap={2}>
                <IconButton
                  aria-label='Edit'
                  bgColor={'transparent'}
                  icon={<PenIcon />}
                  size='sm'
                  onClick={() => onEdit(row)}
                />
                <IconButton
                  aria-label='Delete'
                  bgColor={'transparent'}
                  icon={<BinIcon />}
                  size='sm'
                  colorScheme='red'
                  onClick={() => onDelete(row)}
                />
              </Flex>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default CustomTable
