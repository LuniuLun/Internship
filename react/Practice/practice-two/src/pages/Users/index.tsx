import { FormEvent, useCallback, useEffect, useState } from 'react'
import { Button, Flex, Stack, useDisclosure } from '@chakra-ui/react'
import { PlusIcon } from '@assets/icons'
import { CustomTable, Pagination, UserModal, WarningModal, StatisticCard, Filter, CustomHeading } from '@components'
import { IUser } from '@type/models'
import { ITEM_PER_PAGE } from '@constants/option'
import { useCustomToast, useUser } from '@hooks'
import { TableRow } from '@components/CustomTable'
import { filterStore } from '@stores'

const Users = () => {
  const { showToast } = useCustomToast()
  const { searchQuery, sortBy, itemsPerPage, setItemsPerPage } = filterStore()
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const { isOpen: isUserModalOpen, onOpen: onOpenUserModal, onClose: onCloseUserModal } = useDisclosure()
  const { isOpen: isWarningModalOpen, onOpen: onOpenWarningModal, onClose: onCloseWarningModal } = useDisclosure()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    usersQuery,
    allUsersQuery,
    transformAllUsers,
    addUserMutation,
    editUserMutation,
    deleteUserMutation,
    lengthAllUsers,
    superAdmin,
    admin,
    employee
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
    setIsSubmitting(true)
    deleteUserMutation.mutate(selectedUser, {
      onSuccess: (response) => {
        showToast({ status: 'success', title: response.message })
        handleCloseWarningModal()
        setIsSubmitting(false)
      },
      onError: (response) => {
        showToast({ status: 'error', title: response.message })
        setIsSubmitting(false)
      }
    })
  }

  const handleSubmit = (data: IUser) => {
    setIsSubmitting(true)
    if (selectedUser?.id) {
      editUserMutation.mutate(data, {
        onSuccess: (response) => {
          showToast({ status: 'success', title: response.message })
          handleCloseUserModal()
          setIsSubmitting(false)
        },
        onError: (response) => {
          showToast({ status: 'error', title: response.message })
          setIsSubmitting(false)
        }
      })
    } else {
      addUserMutation.mutate(data, {
        onSuccess: (response) => {
          showToast({ status: 'success', title: response.message })
          handleCloseUserModal()
          setIsSubmitting(false)
        },
        onError: (response) => {
          showToast({ status: 'error', title: response.message })
          setIsSubmitting(false)
        }
      })
    }
  }

  if (usersQuery.isError || allUsersQuery.isError) {
    showToast({
      status: 'error',
      title: 'Error fetching users'
    })
  }

  return (
    <Stack gap={6}>
      <CustomHeading variant='primary' paddingLeft='13px' title='Users' />
      <Filter isLoaded={!usersQuery.isFetching || usersQuery.isFetchingNextPage || allUsersQuery.isFetching}>
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
          <StatisticCard label='Users' value={lengthAllUsers} isLoaded={!allUsersQuery.isFetching} />
          <StatisticCard label='Super Admins' value={superAdmin?.length || 0} isLoaded={!allUsersQuery.isFetching} />
        </Flex>
        <Flex gap={4} w='100%'>
          <StatisticCard label='Admins' value={admin?.length || 0} isLoaded={!allUsersQuery.isFetching} />
          <StatisticCard label='Employees' value={employee?.length || 0} isLoaded={!allUsersQuery.isFetching} />
        </Flex>
      </Flex>

      <CustomTable
        data={
          transformAllUsers?.slice(
            currentPage * itemsPerPage,
            (currentPage + 1) * itemsPerPage
          ) as unknown as TableRow[]
        }
        title='List Users'
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoaded={!usersQuery.isFetching && !usersQuery.isFetchingNextPage && !allUsersQuery.isFetching}
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
          isLoaded={!allUsersQuery.isFetching}
        />
      </Flex>

      <UserModal
        selectedUser={selectedUser}
        isModalOpen={isUserModalOpen}
        onClose={handleCloseUserModal}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      <WarningModal
        isModalOpen={isWarningModalOpen}
        onClose={handleCloseWarningModal}
        title='WARNING'
        message='This action will permanently delete the user. Do you want to proceed?'
        handleSubmit={handleWarningSubmit}
        isSubmitting={isSubmitting}
      />
    </Stack>
  )
}

export default Users
