import Button from '../Button'
import Heading from '../Heading'
import { FormAction, FormContainer, Title } from './Form.styled'

interface IFormProps extends React.HTMLAttributes<HTMLFormElement> {
  id?: string
  title: string
  children?: React.ReactNode
  bottomBorderTitle?: boolean
  handleCancel: () => void
}

const Form = ({ id, title, children, handleCancel, bottomBorderTitle = true, ...props }: IFormProps) => {
  return (
    <FormContainer {...props}>
      {id && <input type='hidden' name='id' value={id} />}
      <Title bottomBorderTitle={bottomBorderTitle}>
        <Heading title={title} />
      </Title>
      {children}
      <FormAction>
        <Button onClick={handleCancel} variant='primary' title='Cancel' />
        <Button type='submit' variant='primary' title='Save' />
      </FormAction>
    </FormContainer>
  )
}

export default Form
