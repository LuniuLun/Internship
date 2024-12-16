import { FilterIcon, PlusIcon, SearchIcon } from '@assets/icons'
import { Button, Flex, FormControl, FormLabel, Heading, Stack, useDisclosure } from '@chakra-ui/react'
import { CustomTable, TextField } from '@components'
import CustomSelect, { SelectOption } from '@components/CustomSelect'
import users from '../../data/users'
import { TableRow } from '@components/CustomTable'
import Pagination from '@components/Pagination'
import { useState } from 'react'
import { useUser } from '@hooks/useUser'
import CustomModal from '@components/CustomModal'

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const { isOpen: isModalOpen, onOpen, onClose } = useDisclosure()
  const { transformedUsers } = useUser(users)
  const totalItems = 100

  const sortOptions: SelectOption<string>[] = [
    { value: 'name', label: 'Name' },
    { value: 'role', label: 'Role' }
  ]

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items)
    setCurrentPage(1)
  }

  const handleEdit = (row: TableRow) => {
    console.log('Edit: ', row)
  }
  const handleDelete = (row: TableRow) => {
    console.log('Delete: ', row)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('Form data submitted:', e.target)
  }

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
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </Flex>
      <CustomModal isOpen={isModalOpen} onClose={onClose} handleSubmit={handleSubmit} title='Add User'>
        <FormControl>
          <FormLabel htmlFor='name'>Name</FormLabel>
          <TextField id='name' name='name' placeholder='Enter your name' variant='outline' />
        </FormControl>
      </CustomModal>
    </Stack>
  )
}

export default Dashboard
