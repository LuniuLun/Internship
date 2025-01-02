import React from 'react'
import { Flex, Text, Button, Skeleton } from '@chakra-ui/react'
import { LeftArrowIcon, RightArrowIcon } from '@assets/icons'
import CustomSelect from '@components/CustomSelect'
import colors from '@styles/variables/colors'

interface PaginationProps {
  currentPage: number
  totalItems: number
  itemsPerPage: number
  itemsPerPageOptions: number[]
  onPageChange: (page: number) => void
  onItemsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  fetchNextPage: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
  isLoaded?: boolean
}

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  itemsPerPageOptions,
  onPageChange,
  onItemsPerPageChange,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoaded
}: PaginationProps) => {
  if ((totalItems === 0 || itemsPerPage === 0) && isLoaded) return null

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
    <Flex
      align='center'
      gap='26px'
      flexDirection={{ base: 'column', md: 'row' }}
      p={4}
      color={colors.brand.blackTextQuaternary}
      fontSize='xs'
    >
      <Skeleton isLoaded={isLoaded} startColor='gray.100' endColor='gray.300' h='25px'>
        <Flex align='center' gap='26px'>
          <Flex align='center' gap='26px'>
            <Text whiteSpace='nowrap'>Items per page:</Text>
            <CustomSelect
              placeholder={itemsPerPage.toString()}
              border='bottom'
              fontSize='xs'
              onChange={onItemsPerPageChange}
              options={itemsPerPageOptions.map((option) => ({
                value: option,
                label: option.toString()
              }))}
              aria-label='items-per-page'
            />
          </Flex>

          <Text>
            {`${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, totalItems)} of ${totalItems}`}
          </Text>
        </Flex>
      </Skeleton>
      <Skeleton isLoaded={isLoaded} startColor='gray.100' endColor='gray.300' h='25px'>
        <Flex gap={2}>
          <Button variant='unstyled' onClick={handlePrevious} isDisabled={currentPage === 1} aria-label='previous-page'>
            <LeftArrowIcon />
          </Button>
          <Button
            variant='unstyled'
            onClick={handleNext}
            isDisabled={currentPage === totalPages || !hasNextPage || isFetchingNextPage}
            aria-label='next-page'
          >
            <RightArrowIcon />
          </Button>
        </Flex>
      </Skeleton>
    </Flex>
  )
}

export default Pagination
