import React from 'react'
import { Flex, Text, Button } from '@chakra-ui/react'
import { LeftArrowIcon, RightArrowIcon } from '@assets/icons'
import CustomSelect from '@components/CustomSelect'

interface PaginationProps {
  currentPage: number
  totalItems: number
  itemsPerPage: number
  itemsPerPageOptions?: number[]
  onPageChange: (page: number) => void
  onItemsPerPageChange: (items: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  itemsPerPageOptions = [5, 10, 20, 50],
  onPageChange,
  onItemsPerPageChange
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1)
  }

  return (
    <Flex align='center' p={4} gap='26px'>
      <Flex align='center' gap='26px'>
        <Text whiteSpace={'nowrap'}>Items per page:</Text>
        <CustomSelect<number>
          border='bottom'
          placeholder={itemsPerPage.toString()}
          onChange={onItemsPerPageChange}
          options={itemsPerPageOptions.map((option) => ({
            value: option,
            label: option.toString()
          }))}
        />
      </Flex>

      <Text>
        {`${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, totalItems)} of ${totalItems}`}
      </Text>

      <Flex gap={2}>
        <Button variant={'unstyled'} onClick={handlePrevious} isDisabled={currentPage === 1}>
          <LeftArrowIcon />
        </Button>
        <Button variant={'unstyled'} onClick={handleNext} isDisabled={currentPage === totalPages}>
          <RightArrowIcon />
        </Button>
      </Flex>
    </Flex>
  )
}

export default Pagination
