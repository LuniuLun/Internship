import { Flex, FormControl, Stack } from '@chakra-ui/react'
import { CustomModal, CustomSelect, ModulePermission, TextField } from '@components'
import { ROLE_OPTION } from '@constants/option'

interface UserModalProps {
  isModalOpen: boolean
  onClose: () => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const UserModal = ({ isModalOpen, onClose, handleSubmit }: UserModalProps) => {
  return (
    <CustomModal size={'6xl'} isOpen={isModalOpen} onClose={onClose} title='Add User' handleSubmit={handleSubmit}>
      <Stack gap={4} px={4}>
        <Flex gap={4} marginTop={4}>
          <FormControl>
            <TextField placeholder='First Name *' variant='outline' />
          </FormControl>
          <FormControl>
            <TextField placeholder='Last Name *' variant='outline' />
          </FormControl>
        </Flex>
        <Flex gap={4}>
          <FormControl>
            <TextField placeholder='Email *' variant='outline' />
          </FormControl>
          <FormControl>
            <TextField placeholder='Mobile *' variant='outline' />
          </FormControl>
          <CustomSelect
            placeholder='Select Role Type'
            options={ROLE_OPTION}
            borderRadius='2xl'
            maxW='100%'
            h='34px'
            fontWeight='light'
          />
        </Flex>
        <Flex gap={4}>
          <FormControl>
            <TextField placeholder='Username *' variant='outline' />
          </FormControl>
          <FormControl>
            <TextField placeholder='Password *' variant='outline' />
          </FormControl>
          <FormControl>
            <TextField placeholder='Confirm Password *' variant='outline' />
          </FormControl>
        </Flex>
      </Stack>
      <ModulePermission />
    </CustomModal>
  )
}

export default UserModal
