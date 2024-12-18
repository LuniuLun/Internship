import React from 'react'
import { Flex, Text, Button } from '@chakra-ui/react'
import { LeftArrowIcon, RightArrowIcon } from '@assets/icons'
import CustomSelect from '@components/CustomSelect'
import colors from '@styles/variables/colors'

interface PaginationProps {
  currentPage: number
  totalItems: number
  itemsPerPage: number
  itemsPerPageOptions: number[]
  onPageChange: (page: number) => void
  onItemsPerPageChange: (items: number) => void
  fetchNextPage: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  itemsPerPageOptions,
  onPageChange,
  onItemsPerPageChange,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
      if (!isFetchingNextPage && hasNextPage) fetchNextPage()
    }
  }

  return (
    <Flex align='center' p={4} gap='26px' color={colors.brand.blackTextQuaternary} fontSize='xs'>
      <Flex align='center' gap='26px'>
        <Text whiteSpace='nowrap'>Items per page:</Text>
        <CustomSelect<number>
          placeholder={itemsPerPage.toString()}
          border='bottom'
          fontSize='xs'
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
        <Button variant='unstyled' onClick={handlePrevious} isDisabled={currentPage === 1}>
          <LeftArrowIcon />
        </Button>
        <Button
          variant='unstyled'
          onClick={handleNext}
          isDisabled={(currentPage === totalPages && !hasNextPage) || isFetchingNextPage}
        >
          <RightArrowIcon />
        </Button>
      </Flex>
    </Flex>
  )
}

export default Pagination
