import { useState, useEffect, FormEvent, useCallback } from 'react'
import { Button, Stack, useDisclosure, Flex } from '@chakra-ui/react'
import { PlusIcon } from '@assets/icons'
import { CustomHeading, CustomTable, Filter, Pagination, UserModal, WarningModal } from '@components'
import { IUser } from '@type/models'
import { useFilterStore } from '@hooks'
import { ITEM_PER_PAGE } from '@constants/option'
import { useCustomToast, useUser } from '@hooks'

const Dashboard = () => {
  const { showToast } = useCustomToast()
  const { searchQuery, sortBy, itemsPerPage, setItemsPerPage } = useFilterStore()
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const { isOpen: isUserModalOpen, onOpen: onOpenUserModal, onClose: onCloseUserModal } = useDisclosure()
  const { isOpen: isWarningModalOpen, onOpen: onOpenWarningModal, onClose: onCloseWarningModal } = useDisclosure()
  const {
    usersQuery,
    allUsersQuery,
    transformedUsers,
    transformAllUsers,
    addUserMutation,
    editUserMutation,
    deleteUserMutation,
    lengthAllUsers
  } = useUser()

  useEffect(() => {
    setCurrentPage(0)
    usersQuery.refetch()
  }, [itemsPerPage, searchQuery, sortBy])

  const handleItemsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(e.target.value))
  }, [])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page - 1)
  }, [])

  const handleEdit = useCallback(
    (id: string) => {
      const user = transformAllUsers?.find((user) => user.id === id)

      if (!user) {
        showToast({ status: 'error', title: 'User does not exist' })
        return
      }
      setSelectedUser(user)
      onOpenUserModal()
    },
    [transformAllUsers]
  )

  const handleDelete = useCallback(
    (id: string) => {
      const user = transformAllUsers?.find((user) => user.id === id)
      if (!user) {
        showToast({ status: 'error', title: 'User does not exist' })
        return
      }
      setSelectedUser(user)
      onOpenWarningModal()
    },
    [transformAllUsers]
  )

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
    deleteUserMutation.mutate(selectedUser, {
      onSuccess: (response) => showToast({ status: 'success', title: response.message }),
      onError: (response) => showToast({ status: 'error', title: response.message })
    })
    handleCloseWarningModal()
  }

  const handleSubmit = (data: IUser) => {
    if (selectedUser?.id) {
      editUserMutation.mutate(data, {
        onSuccess: (response) => showToast({ status: 'success', title: response.message }),
        onError: (response) => showToast({ status: 'error', title: response.message })
      })
    } else {
      addUserMutation.mutate(data, {
        onSuccess: (response) => showToast({ status: 'success', title: response.message }),
        onError: (response) => showToast({ status: 'error', title: response.message })
      })
    }
    handleCloseUserModal()
  }

  if (usersQuery.isError || allUsersQuery.isError) {
    showToast({
      status: 'error',
      title: 'Error fetching users'
    })
  }

  return (
    <Stack gap={6}>
      <CustomHeading variant='primary' paddingLeft='13px' title='Users Dashboard' />
      <Filter
        isLoaded={
          !addUserMutation.isPending &&
          !editUserMutation.isPending &&
          !usersQuery.isFetching &&
          !allUsersQuery.isFetching
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
        data={transformedUsers?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)}
        title='List Users'
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoaded={!addUserMutation.isPending && !editUserMutation.isPending && !usersQuery.isFetching}
      />

      <Flex justifyContent='center'>
        <Pagination
          currentPage={currentPage + 1}
          totalItems={lengthAllUsers}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          fetchNextPage={usersQuery.fetchNextPage}
          hasNextPage={usersQuery.hasNextPage}
          isFetchingNextPage={usersQuery.isFetchingNextPage}
          itemsPerPageOptions={ITEM_PER_PAGE}
          isLoaded={!addUserMutation.isPending && !editUserMutation.isPending && !usersQuery.isFetching}
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
