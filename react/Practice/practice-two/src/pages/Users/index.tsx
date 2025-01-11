/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react'
import { Button, Flex, Heading, Stack, useDisclosure } from '@chakra-ui/react'
import { PlusIcon } from '@assets/icons'
import { CustomTable, Pagination, UserModal, WarningModal, StatisticCard, Filter } from '@components'
import { IUser } from '@type/models'
import { fetchAllUsers, fetchUsers } from '@services/user'
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
    refetchOnWindowFocus: false
  })

  const {
    data: allUsers,
    isLoading: isFirstAllUserLoading,
    isError: allUsersIsError,
    error: allUsersError
  } = useQuery({
    queryKey: ['allUsers', searchQuery],
    queryFn: () => fetchAllUsers('firstName', searchQuery),
    refetchOnWindowFocus: false
  })

  const usersData: IUser[] = data?.pages[currentPage]?.data || []
  const { transformAllUsers, addUserMutation, editUserMutation, deleteUserMutation, admin, employee, superAdmin } =
    useUser(usersData, allUsers?.data || [], currentPage)

  useEffect(() => {
    setCurrentPage(0)
    refetch()
  }, [itemsPerPage, searchQuery, sortBy, refetch])

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(e.target.value))
  }

  const handleEdit = useCallback(
    (id: string) => {
      const user = usersData.find((user) => user.id === id)
      if (!user) {
        showToast({ status: 'error', title: 'User does not exist' })
        return
      }
      setSelectedUser(user)
      onOpenUserModal()
    },
    [usersData]
  )

  const handleDelete = useCallback(
    (id: string) => {
      const user = usersData.find((user) => user.id === id)
      if (!user) {
        showToast({ status: 'error', title: 'User does not exist' })
        return
      }
      setSelectedUser(user)
      onOpenWarningModal()
    },
    [usersData]
  )

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
    showToast({
      status: 'error',
      title: error?.message || allUsersError?.message || allUsersError?.message || 'Error fetching users'
    })

  return (
    <Stack gap={6}>
      <Heading variant='primary' paddingLeft='13px'>
        Users
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
        >
          Add user <PlusIcon />
        </Button>
      </Filter>

      <Flex gap={4} flexDirection={{ base: 'column', md: 'row' }}>
        <Flex gap={4} w='100%'>
          <StatisticCard label='Users' value={allUsers?.data?.length || 0} isLoaded={!isFirstAllUserLoading} />
          <StatisticCard label='Super Admins' value={superAdmin.length} isLoaded={!isFirstAllUserLoading} />
        </Flex>
        <Flex gap={4} w='100%'>
          <StatisticCard label='Admins' value={admin.length} isLoaded={!isFirstAllUserLoading} />
          <StatisticCard label='Employees' value={employee.length} isLoaded={!isFirstAllUserLoading} />
        </Flex>
      </Flex>

      <CustomTable
        data={transformAllUsers}
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
