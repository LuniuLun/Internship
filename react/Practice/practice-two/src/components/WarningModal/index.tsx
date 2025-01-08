import { Box, Text } from '@chakra-ui/react'
import { CustomModal } from '@components'

interface WarningModalProps {
  isModalOpen: boolean
  onClose: () => void
  title: string
  message: string
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const WarningModal = ({ isModalOpen, onClose, title, message, handleSubmit }: WarningModalProps) => {
  return (
    <CustomModal size={'lg'} isOpen={isModalOpen} onClose={onClose} title={title} handleSubmit={handleSubmit}>
      <Box textAlign='center' marginTop={4} px={10}>
        <Text fontSize='lg' color='brand.blackTextSecondary' fontWeight='Bold'>
          {message}
        </Text>
      </Box>
    </CustomModal>
  )
}

export default WarningModal
