import { Flex, FormControl, Stack } from '@chakra-ui/react'
import { CustomModal, CustomSelect, ModulePermission, TextField } from '@components'
import { ROLE_OPTION } from '@constants/option'
import { IUser } from '@type/models'

interface UserModalProps {
  selectedUser?: IUser | null
  isModalOpen: boolean
  onClose: () => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const UserModal = ({ selectedUser, isModalOpen, onClose, handleSubmit }: UserModalProps) => {
  return (
    <CustomModal
      size={'6xl'}
      isOpen={isModalOpen}
      onClose={onClose}
      title={selectedUser?.id ? 'Edit User' : 'Add User'}
      handleSubmit={handleSubmit}
    >
      <Stack gap={4} px={4}>
        <Flex gap={4} marginTop={4}>
          <FormControl>
            <TextField placeholder='First Name *' name='firstName' variant='outline' value={selectedUser?.firstName} />
          </FormControl>
          <FormControl>
            <TextField placeholder='Last Name *' name='lastName' variant='outline' value={selectedUser?.lastName} />
          </FormControl>
        </Flex>
        <Flex gap={4}>
          <FormControl>
            <TextField placeholder='Email *' name='email' variant='outline' value={selectedUser?.email} />
          </FormControl>
          <FormControl>
            <TextField placeholder='Mobile *' name='phone' variant='outline' value={selectedUser?.phone} />
          </FormControl>
          <CustomSelect
            name='role'
            placeholder='Select Role Type'
            options={ROLE_OPTION}
            borderRadius='2xl'
            maxW='100%'
            h='34px'
            fontWeight='light'
            value={selectedUser?.role}
          />
        </Flex>
        <Flex gap={4}>
          <FormControl>
            <TextField placeholder='Username *' name='username' variant='outline' value={selectedUser?.username} />
          </FormControl>
          <FormControl>
            <TextField
              placeholder='Password *'
              name='password'
              variant='outline'
              type='password'
              value={selectedUser?.password}
            />
          </FormControl>
          {!selectedUser?.id && (
            <FormControl>
              <TextField placeholder='Confirm Password *' name='confirmPassword' variant='outline' type='password' />
            </FormControl>
          )}
        </Flex>
      </Stack>
      <ModulePermission />
    </CustomModal>
  )
}

export default UserModal
