import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button
} from '@chakra-ui/react'
import colors from '@styles/variables/colors'

interface CustomModalProps {
  isOpen: boolean
  onClose: () => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  title: string
  children: React.ReactNode
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, handleSubmit, title, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom' scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent bgColor={colors.brand.white}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            {children}
            <ModalFooter gap={4} paddingRight={0}>
              <Button variant='primary' type='submit' size={'sm'}>
                Submit
              </Button>
              <Button variant='secondary' onClick={onClose} size={'sm'}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CustomModal
