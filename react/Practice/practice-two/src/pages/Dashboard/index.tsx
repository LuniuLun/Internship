import { useState, useEffect, FormEvent } from 'react'
import { Button, Stack, Heading, useDisclosure, Flex } from '@chakra-ui/react'
import { PlusIcon } from '@assets/icons'
import { CustomTable, Filter, Pagination, UserModal, WarningModal } from '@components'
import { IUser } from '@type/models'
import { fetchUsers, fetchAllUsers } from '@services/user'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { ITEM_PER_PAGE } from '@constants/option'
import { useCustomToast, useFilterStore, useUser } from '@hooks'

const Dashboard = () => {
  const { showToast } = useCustomToast()
  const { searchQuery, sortBy, itemsPerPage, setItemsPerPage } = useFilterStore()
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const { isOpen: isUserModalOpen, onOpen: onOpenUserModal, onClose: onCloseUserModal } = useDisclosure()
  const { isOpen: isWarningModalOpen, onOpen: onOpenWarningModal, onClose: onCloseWarningModal } = useDisclosure()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
    isError,
    error,
    isLoading: isFirstUserLoading
  } = useInfiniteQuery({
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
    isLoading: isFirstAllUserLoading,
    isError: allUsersIsError,
    error: allUsersError
  } = useQuery({
    queryKey: ['allUsers', searchQuery],
    queryFn: () => fetchAllUsers('firstName', searchQuery),
    staleTime: 5 * 60 * 1000
  })

  const usersData: IUser[] = data?.pages[currentPage]?.data || []
  const { transformedUsers, addUserMutation, editUserMutation, deleteUserMutation } = useUser(
    usersData,
    allUsers?.data || [],
    currentPage
  )

  useEffect(() => {
    setCurrentPage(0)
    refetch()
  }, [itemsPerPage, searchQuery, sortBy, refetch])

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(e.target.value))
  }

  const handleEdit = (id: string) => {
    const user = usersData.find((user) => user.id === id)
    if (!user) {
      showToast({ status: 'error', title: 'User does not exist' })
      return
    }
    setSelectedUser(user)
    onOpenUserModal()
  }

  const handleDelete = (id: string) => {
    const user = usersData.find((user) => user.id === id)
    if (!user) {
      showToast({ status: 'error', title: 'User does not exist' })
      return
    }
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

  const handleWarningSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedUser?.id) {
      showToast({ status: 'error', title: 'User does not exist' })
      return
    }
    deleteUserMutation.mutate(
      { ...selectedUser },
      {
        onSuccess: (response) => showToast({ status: 'success', title: response.message }),
        onError: (response) => showToast({ status: 'error', title: response.message })
      }
    )
    handleCloseWarningModal()
  }

  const handleSubmit = (data: IUser) => {
    if (selectedUser?.id) {
      editUserMutation.mutate(
        { ...data },
        {
          onSuccess: (response) => showToast({ status: 'success', title: response.message }),
          onError: (response) => showToast({ status: 'error', title: response.message })
        }
      )
    } else {
      addUserMutation.mutate(data, {
        onSuccess: (response) => showToast({ status: 'success', title: response.message }),
        onError: (response) => showToast({ status: 'error', title: response.message })
      })
    }
    handleCloseUserModal()
  }

  if (isError || allUsersIsError)
    showToast({ status: 'error', title: error?.message || allUsersError?.message || 'Error fetching users' })

  return (
    <Stack gap={6}>
      <Heading variant='primary' paddingLeft='13px'>
        Users Dashboard
      </Heading>
      <Filter
        isLoaded={
          !addUserMutation.isPending &&
          !editUserMutation.isPending &&
          !isFetchingNextPage &&
          !isFetching &&
          !isFirstAllUserLoading &&
          !isFirstUserLoading
        }
      >
        <Button
          size='md'
          display='flex'
          gap={2}
          onClick={onOpenUserModal}
          w='100%'
          isLoading={addUserMutation.isPending}
          aria-label='add-user-btn'
        >
          Add user <PlusIcon />
        </Button>
      </Filter>

      <CustomTable
        data={transformedUsers}
        title='List Users'
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoaded={
          !addUserMutation.isPending &&
          !editUserMutation.isPending &&
          !isFetchingNextPage &&
          !isFetching &&
          !isFirstAllUserLoading &&
          !isFirstUserLoading
        }
      />

      <Flex justifyContent='center'>
        <Pagination
          currentPage={currentPage + 1}
          totalItems={allUsers?.data?.length || 0}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page - 1)}
          onItemsPerPageChange={handleItemsPerPageChange}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          itemsPerPageOptions={ITEM_PER_PAGE}
          isLoaded={
            !addUserMutation.isPending &&
            !editUserMutation.isPending &&
            !isFetchingNextPage &&
            !isFetching &&
            !isFirstAllUserLoading &&
            !isFirstUserLoading
          }
        />
      </Flex>

      <UserModal
        selectedUser={selectedUser}
        isModalOpen={isUserModalOpen}
        onClose={handleCloseUserModal}
        handleSubmit={handleSubmit}
      />
      <WarningModal
        isModalOpen={isWarningModalOpen}
        onClose={handleCloseWarningModal}
        title='WARNING'
        message='This action will permanently delete the user. Do you want to proceed?'
        handleSubmit={handleWarningSubmit}
      />
    </Stack>
  )
}

export default Dashboard
