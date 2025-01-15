import { memo } from 'react'
import { Flex, Text, Skeleton, IconButton } from '@chakra-ui/react'
import { LeftArrowIcon, RightArrowIcon } from '@assets/icons'
import CustomSelect from '@components/CustomSelect'
import colors from '@styles/variables/colors'
import { filterStore } from '@stores'

interface PaginationProps {
  totalItems: number
  itemsPerPageOptions: number[]
  fetchNextPage: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
  isLoaded?: boolean
}
const Pagination = ({
  totalItems,
  itemsPerPageOptions,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoaded
}: PaginationProps) => {
  const { itemsPerPage, currentPage, setItemsPerPage, setCurrentPage } = filterStore()
  if ((totalItems === 0 || itemsPerPage === 0) && isLoaded) return null

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const selectOptions = itemsPerPageOptions.map((option) => ({
    value: option,
    label: option.toString()
  }))

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(e.target.value))
  }

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
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
      <Skeleton isLoaded={isLoaded} startColor='gray.100' endColor='gray.300' minH='25px'>
        <Flex align='center' gap='26px'>
          <Flex align='center' gap='26px'>
            <Text whiteSpace='nowrap'>Items per page:</Text>
            <CustomSelect
              placeholder={itemsPerPage.toString()}
              border='bottom'
              fontSize='xs'
              onChange={handleItemsPerPageChange}
              options={selectOptions}
              aria-label='items-per-page'
            />
          </Flex>

          <Text>{`${currentPage * itemsPerPage + 1} - ${Math.min((currentPage + 1) * itemsPerPage, totalItems)} of ${totalItems}`}</Text>
        </Flex>
      </Skeleton>
      <Skeleton isLoaded={isLoaded} startColor='gray.100' endColor='gray.300' minH='25px'>
        <Flex gap={2}>
          <IconButton
            icon={<LeftArrowIcon />}
            variant='unstyled'
            onClick={handlePrevious}
            isDisabled={currentPage < 1}
            aria-label='previous-page'
          />
          <IconButton
            icon={<RightArrowIcon />}
            variant='unstyled'
            onClick={handleNext}
            isDisabled={currentPage === totalPages || !hasNextPage || isFetchingNextPage}
            aria-label='next-page'
          ></IconButton>
        </Flex>
      </Skeleton>
    </Flex>
  )
}

export default memo(Pagination)
