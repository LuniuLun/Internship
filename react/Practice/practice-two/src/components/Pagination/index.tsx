import { memo, useCallback, useMemo } from 'react'
import { Flex, Text, Skeleton, IconButton } from '@chakra-ui/react'
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
const Pagination = memo(
  ({
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
    const totalPages = useMemo(() => Math.ceil(totalItems / itemsPerPage), [totalItems, itemsPerPage])

    const paginationRange = useMemo(() => {
      const start = (currentPage - 1) * itemsPerPage + 1
      const end = Math.min(currentPage * itemsPerPage, totalItems)
      return `${start}-${end} of ${totalItems}`
    }, [currentPage, itemsPerPage, totalItems])

    const selectOptions = useMemo(
      () =>
        itemsPerPageOptions.map((option) => ({
          value: option,
          label: option.toString()
        })),
      [itemsPerPageOptions]
    )

    const handlePrevious = useCallback(() => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1)
      }
    }, [currentPage, onPageChange])

    const handleNext = useCallback(() => {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1)
        if (!isFetchingNextPage && hasNextPage) fetchNextPage()
      }
    }, [currentPage, totalPages, onPageChange, isFetchingNextPage, hasNextPage, fetchNextPage])

    if ((totalItems === 0 || itemsPerPage === 0) && isLoaded) return null

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
                onChange={onItemsPerPageChange}
                options={selectOptions}
                aria-label='items-per-page'
              />
            </Flex>

            <Text>{paginationRange}</Text>
          </Flex>
        </Skeleton>
        <Skeleton isLoaded={isLoaded} startColor='gray.100' endColor='gray.300' minH='25px'>
          <Flex gap={2}>
            <IconButton
              icon={<LeftArrowIcon />}
              variant='unstyled'
              onClick={handlePrevious}
              isDisabled={currentPage === 1}
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
)

export default Pagination
