import {
  ModalProps,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Heading,
  Modal
} from '@chakra-ui/react'
import colors from '@styles/variables/colors'

interface CustomModalProps extends ModalProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  title: string
}

const CustomModal = ({ isOpen, onClose, handleSubmit, title, children, ...props }: CustomModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom' scrollBehavior='inside' isCentered {...props}>
      <ModalOverlay />
      <ModalContent bgColor={colors.brand.white}>
        <ModalHeader borderBottom={`1px solid ${colors.brand.secondary}`}>
          <Heading variant='secondary'>{title}</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody px='unset'>
          <form onSubmit={handleSubmit}>
            {children}
            <ModalFooter gap={4} marginTop={10}>
              <Button variant='primary' type='submit' size={'sm'} aria-label='submit'>
                Submit
              </Button>
              <Button variant='secondary' onClick={onClose} size={'sm'} aria-label='cancel'>
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
