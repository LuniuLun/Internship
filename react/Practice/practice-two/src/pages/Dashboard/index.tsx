import { useEffect, useState } from 'react'
import { Button, Flex, FormControl, FormLabel, Heading, Stack, useDisclosure } from '@chakra-ui/react'
import { FilterIcon, PlusIcon, SearchIcon } from '@assets/icons'
import { CustomTable, TextField, Pagination, CustomModal, CustomSelect } from '@components'
import { useUser } from '@hooks/useUser'
import { IUser } from '@type/models'
import { itemsPerPageOptions, sortOptions } from '@constants/option'
import { fetchUsers } from '@services/user'
import { useInfiniteQuery } from '@tanstack/react-query'
import { TableRow } from '@components/CustomTable'

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [itemsPerPage, setItemsPerPage] = useState<number>(5)
  const { isOpen: isModalOpen, onOpen, onClose } = useDisclosure()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery({
    queryKey: ['projects', itemsPerPage],
    queryFn: async ({ pageParam = 1 }) => {
      return await fetchUsers({ page: pageParam.toString(), limit: itemsPerPage.toString() })
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (!lastPage.data || lastPage.data.length === 0) return undefined
      return lastPageParam + 1
    }
  })

  useEffect(() => {
    setCurrentPage(0)
    refetch()
  }, [itemsPerPage, refetch])

  const usersData: IUser[] = data?.pages[currentPage]?.data || []
  const { loading, error, userQuantity, getUserQuantity, transformedUsers } = useUser(usersData)

  useEffect(() => {
    getUserQuantity()
  }, [])

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items)
  }

  const handleEdit = (row: TableRow) => console.log('Edit: ', row)
  const handleDelete = (row: TableRow) => console.log('Delete: ', row)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Form data submitted:', e.target)
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <Stack gap={6}>
      <Heading variant='primary' paddingLeft='13px'>
        Users Dashboard
      </Heading>
      <Flex gap={8} alignItems='center'>
        <TextField icon={<SearchIcon />} variant='outline' size='lg' placeholder='Search' />
        <Button display='flex' gap={2} onClick={onOpen}>
          Add user
          <PlusIcon />
        </Button>
        <CustomSelect options={sortOptions} placeholder='Sort by' />
        <FilterIcon />
      </Flex>

      <CustomTable data={transformedUsers} title='List User' onEdit={handleEdit} onDelete={handleDelete} />

      <Flex justifyContent='center'>
        <Pagination
          currentPage={currentPage + 1}
          totalItems={userQuantity}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page - 1)}
          onItemsPerPageChange={handleItemsPerPageChange}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          itemsPerPageOptions={itemsPerPageOptions}
        />
      </Flex>

      <CustomModal isOpen={isModalOpen} onClose={onClose} title='Add User' handleSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <TextField placeholder='Enter name' variant='outline' />
        </FormControl>
      </CustomModal>
    </Stack>
  )
}

export default Dashboard
