import { useEffect, useState } from 'react'
import { Button, Flex, Heading, Stack, useDisclosure } from '@chakra-ui/react'
import { FilterIcon, PlusIcon, SearchIcon } from '@assets/icons'
import { CustomTable, TextField, Pagination, CustomSelect, UserModal, WarningModal } from '@components'
import { useUser } from '@hooks/useUser'
import { IUser } from '@type/models'
import { addUser, editUser, fetchUsers } from '@services/user'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ITEM_PER_PAGE, SORT_OPTION } from '@constants/option'
import { IApiResponse } from '@type/apiResponse'

const Dashboard = () => {
  const queryClient = useQueryClient()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [itemsPerPage, setItemsPerPage] = useState<number>(5)
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
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

  const addUserMutation = useMutation<IApiResponse<IUser>, Error, IUser>({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })

  const editUserMutation = useMutation<IApiResponse<IUser>, Error, IUser>({
    mutationFn: editUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })

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
    console.log('Delete user:', selectedUser)
    onCloseWarningModal()
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newUser: IUser = {
      id: selectedUser?.id || '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      role: '',
      createDate: selectedUser?.createDate || new Date().toISOString()
    }

    const formData = new FormData(e.target as HTMLFormElement)
    for (const [key, value] of formData.entries()) {
      if (key in newUser) {
        newUser[key as keyof IUser] = value as string
      }
    }

    if (selectedUser?.id) {
      editUserMutation.mutate(
        { ...newUser },
        {
          onSuccess: (response) => {
            console.log(response.message)
          },
          onError: (response) => {
            console.error('Error editing user:', response.message)
          }
        }
      )
    } else {
      addUserMutation.mutate(newUser, {
        onSuccess: (response) => {
          console.log(response.message)
        },
        onError: (response) => {
          console.error('Error editing user:', response.message)
        }
      })
    }
    handleCloseUserModal()
  }

  if (addUserMutation.isPending || editUserMutation.isPending || loading || isFetchingNextPage || isFetching)
    return <div>Loading...</div>
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
