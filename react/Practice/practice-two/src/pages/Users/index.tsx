import { useEffect, useState } from 'react'
import { Button, Flex, Heading, Stack, useDisclosure } from '@chakra-ui/react'
import { FilterIcon, PlusIcon, SearchIcon } from '@assets/icons'
import { CustomTable, TextField, Pagination, CustomSelect, UserModal, WarningModal, StatisticCard } from '@components'
import { useUser } from '@hooks/useUser'
import { IUser } from '@type/models'
import { fetchAllUsers, fetchUsers } from '@services/user'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { ITEM_PER_PAGE, SORT_OPTION } from '@constants/option'
import { useCustomToast } from '@hooks/useCustomToast'

const Dashboard = () => {
  const { showToast } = useCustomToast()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [itemsPerPage, setItemsPerPage] = useState<number>(5)
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const { isOpen: isUserModalOpen, onOpen: onOpenUserModal, onClose: onCloseUserModal } = useDisclosure()
  const { isOpen: isWarningModalOpen, onOpen: onOpenWarningModal, onClose: onCloseWarningModal } = useDisclosure()

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, refetch, error } = useInfiniteQuery({
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

  const {
    data: allUsers,
    isLoading,
    error: allUsersError
  } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const response = await fetchAllUsers()
      return response.data
    },
    staleTime: 5 * 60 * 1000
  })

  const usersData: IUser[] = data?.pages[currentPage]?.data || []
  const { transformAllUsers, addUserMutation, editUserMutation, deleteUserMutation, admin, employee, superAdmin } =
    useUser(usersData, allUsers || [])

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

  const handleCloseUserModal = () => {
    setSelectedUser(null)
    onCloseUserModal()
  }

  const handleCloseWarningModal = () => {
    setSelectedUser(null)
    onCloseWarningModal()
  }

  const handleWarningSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedUser?.id) {
      deleteUserMutation.mutate(
        { ...selectedUser },
        {
          onSuccess: (response) => {
            showToast({ status: 'success', title: response.message })
          },
          onError: (response) => {
            showToast({ status: 'error', title: response.message })
          }
        }
      )
    }
    onCloseWarningModal()
  }

  const handleSubmit = (data: IUser) => {
    if (selectedUser?.id) {
      editUserMutation.mutate(
        { ...data },
        {
          onSuccess: (response) => {
            showToast({ status: 'success', title: response.message })
            // getAllUser()
          },
          onError: (response) => {
            showToast({ status: 'error', title: response.message })
          }
        }
      )
    } else {
      addUserMutation.mutate(data, {
        onSuccess: (response) => {
          showToast({ status: 'success', title: response.message })
          // getAllUser()
        },
        onError: (response) => {
          showToast({ status: 'error', title: response.message })
        }
      })
    }
    handleCloseUserModal()
  }

  if (error || allUsersError) showToast({ status: 'error', title: error?.message || allUsersError?.message })

  return (
    <Stack gap={6}>
      <Heading variant='primary' paddingLeft='13px'>
        Users
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

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Flex gap={4}>
          <StatisticCard label='Users' value={allUsers?.length || 0} />
          <StatisticCard label='Super Admins' value={superAdmin.length} />
          <StatisticCard label='Admins' value={admin.length} />
          <StatisticCard label='Employees' value={employee.length} />
        </Flex>
      )}

      {addUserMutation.isPending || editUserMutation.isPending || isFetchingNextPage || isFetching ? (
        <div>Loading...</div>
      ) : (
        <>
          <CustomTable data={transformAllUsers} title='List User' onEdit={handleEdit} onDelete={handleDelete} />

          <Flex justifyContent='center'>
            <Pagination
              currentPage={currentPage + 1}
              totalItems={allUsers?.length || 0}
              itemsPerPage={itemsPerPage}
              onPageChange={(page) => setCurrentPage(page - 1)}
              onItemsPerPageChange={handleItemsPerPageChange}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              itemsPerPageOptions={ITEM_PER_PAGE}
            />
          </Flex>
        </>
      )}

      <UserModal
        selectedUser={selectedUser}
        isModalOpen={isUserModalOpen}
        onClose={handleCloseUserModal}
        handleSubmit={handleSubmit}
      />

      <WarningModal
        isModalOpen={isWarningModalOpen}
        onClose={handleCloseWarningModal}
        title='Warning'
        message='This action will permanently delete the user. Do you want to proceed?'
        handleSubmit={handleWarningSubmit}
      />
    </Stack>
  )
}

export default Dashboard
