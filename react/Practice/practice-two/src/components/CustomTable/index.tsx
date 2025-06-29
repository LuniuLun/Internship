import { memo } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Flex,
  TableCaption,
  TableProps,
  Heading,
  Box,
  Skeleton
} from '@chakra-ui/react'
import { BinIcon, PenIcon } from '@assets/icons'
import colors from '@styles/variables/colors'
import FAKE_TABLE_DATA from '@constants/fakeTable'
import CustomCell from './CustomCell'

export interface TableRow {
  [key: string]: string | number | boolean | Date | React.ReactNode
}

interface CustomTableProps extends TableProps {
  title?: string
  data: TableRow[] | undefined
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  isLoaded?: boolean
}

const CustomTable = ({ isLoaded, title, data, onEdit, onDelete, ...props }: CustomTableProps) => {
  if (!data || (data.length === 0 && isLoaded)) {
    return (
      <Heading variant='secondary' color='brand.red'>
        No data found
      </Heading>
    )
  }

  const headers = data.length ? Object.keys(data[0]) : Object.keys(FAKE_TABLE_DATA[0])
  const filteredHeaders = headers.filter((header) => header !== 'id')

  const tableData = data.length ? data : FAKE_TABLE_DATA

  const hasActions = Boolean(onEdit || onDelete)

  return (
    <Box overflowX='auto'>
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
          <Tr bgColor={colors.brand.secondary}>
            {filteredHeaders.map((header, index) => (
              <Th
                key={header}
                borderBottom={`2px solid ${colors.brand.secondary}`}
                padding={5}
                minW='150px'
                fontSize='md'
                textTransform='capitalize'
                textAlign={index === 0 ? 'left' : 'center'}
                color={colors.brand.blackTextSecondary}
              >
                <Skeleton isLoaded={isLoaded} startColor='gray.100' endColor='gray.300'>
                  {header.replace(/([a-z])([A-Z])/g, '$1 $2')}
                </Skeleton>
              </Th>
            ))}
            {hasActions && (
              <Th
                textAlign='center'
                minW='150px'
                padding={5}
                fontSize='md'
                textTransform='capitalize'
                borderBottom={`2px solid ${colors.brand.secondary}`}
                color={colors.brand.blackTextSecondary}
              >
                <Skeleton isLoaded={isLoaded} startColor='gray.100' endColor='gray.300'>
                  Action
                </Skeleton>
              </Th>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {tableData.map((row, rowIndex) => (
            <Tr key={rowIndex} fontSize='sm' color={colors.brand.blackTextPrimary}>
              {filteredHeaders.map((header, index) => (
                <Td
                  key={header}
                  borderBottom={`2px solid ${colors.brand.secondary}`}
                  maxW='200px'
                  textAlign={index === 0 ? 'left' : 'center'}
                  bgColor={colors.brand.white}
                >
                  <Skeleton
                    isLoaded={isLoaded}
                    startColor='gray.100'
                    endColor='gray.300'
                    overflow='hidden'
                    textOverflow='ellipsis'
                    whiteSpace='nowrap'
                  >
                    <CustomCell header={header} row={row} />
                  </Skeleton>
                </Td>
              ))}
              {hasActions && (
                <Td minW='150px' borderBottom={`2px solid ${colors.brand.secondary}`} bgColor={colors.brand.white}>
                  <Skeleton isLoaded={isLoaded} startColor='gray.100' endColor='gray.300'>
                    <Flex gap={2} justifyContent='center'>
                      {onEdit && (
                        <IconButton
                          aria-label='edit-user-btn'
                          bgColor={colors.brand.white}
                          icon={<PenIcon />}
                          size='sm'
                          onClick={() => onEdit && onEdit(row.id as string)}
                        />
                      )}
                      {onDelete && (
                        <IconButton
                          aria-label='delete-user-btn'
                          bgColor={colors.brand.white}
                          _hover={{
                            bgColor: colors.brand.red
                          }}
                          icon={<BinIcon />}
                          size='sm'
                          colorScheme='red'
                          onClick={() => onDelete && onDelete(row.id as string)}
                        />
                      )}
                    </Flex>
                  </Skeleton>
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default memo(CustomTable)
