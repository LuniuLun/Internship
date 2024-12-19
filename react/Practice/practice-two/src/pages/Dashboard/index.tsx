import { useEffect, useState } from 'react'
import { Button, Flex, Heading, Stack, useDisclosure } from '@chakra-ui/react'
import { FilterIcon, PlusIcon, SearchIcon } from '@assets/icons'
import { CustomTable, TextField, Pagination, CustomSelect, UserModal, WarningModal } from '@components'
import { useUser } from '@hooks/useUser'
import { IUser } from '@type/models'
import { fetchUsers } from '@services/user'
import { useInfiniteQuery } from '@tanstack/react-query'
import { ITEM_PER_PAGE, SORT_OPTION } from '@constants/option'

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [itemsPerPage, setItemsPerPage] = useState<number>(5)
  const [selectedUser, setSelectedUser] = useState<IUser>()
  const { isOpen: isUserModalOpen, onOpen: onOpenUserModal, onClose: onCloseUserModal } = useDisclosure()
  const { isOpen: isWarningModalOpen, onOpen: onOpenWarningModal, onClose: onCloseWarningModal } = useDisclosure()

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, refetch } = useInfiniteQuery({
    queryKey: ['users', itemsPerPage, searchQuery, sortBy],
    queryFn: async ({ pageParam = 1 }) => {
      return await fetchUsers({
        page: pageParam.toString(),
        limit: itemsPerPage.toString(),
        property: 'firstName',
        value: searchQuery,
        sortBy,
        order: 'asc'
      })
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (!lastPage.data || lastPage.data.length === 0) return undefined
      return lastPageParam + 1
    },
    staleTime: 5 * 60 * 1000
  })

  const usersData: IUser[] = data?.pages[currentPage]?.data || []
  const { loading, error, userQuantity, getUserQuantity, transformedUsers } = useUser(usersData)

  useEffect(() => {
    getUserQuantity()
  }, [])

  useEffect(() => {
    setCurrentPage(0)
    refetch()
  }, [itemsPerPage, searchQuery, sortBy, refetch])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value)
  }

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(e.target.value))
  }

  const handleEdit = (id: string) => {
    const user = usersData.find((user) => user.id === id)
    if (!user) return
    setSelectedUser(user)
    onOpenUserModal()
  }

  const handleDelete = (id: string) => {
    const user = usersData.find((user) => user.id === id)
    if (!user) return
    setSelectedUser(user)
    onOpenWarningModal()
  }

  const handleWarningSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Delete user:', selectedUser)
    onCloseWarningModal()
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Form data submitted:', e.target)
  }

  if (loading || isFetchingNextPage || isFetching) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <Stack gap={6}>
      <Heading variant='primary' paddingLeft='13px'>
        Users Dashboard
      </Heading>
      <Flex gap={8} alignItems='center'>
        <TextField
          icon={<SearchIcon />}
          variant='outline'
          size='lg'
          placeholder='Search'
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Button display='flex' gap={2} onClick={onOpenUserModal}>
          Add user
          <PlusIcon />
        </Button>
        <CustomSelect options={SORT_OPTION} placeholder='Sort by' onChange={handleSortChange} />
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
          itemsPerPageOptions={ITEM_PER_PAGE}
        />
      </Flex>

      <UserModal
        selectedUser={selectedUser}
        isModalOpen={isUserModalOpen}
        onClose={onCloseUserModal}
        handleSubmit={handleSubmit}
      />

      <WarningModal
        isModalOpen={isWarningModalOpen}
        onClose={onCloseWarningModal}
        title='Warning'
        message='This action will permanently delete the user. Do you want to proceed?'
        handleSubmit={handleWarningSubmit}
      />
    </Stack>
  )
}

export default Dashboard
