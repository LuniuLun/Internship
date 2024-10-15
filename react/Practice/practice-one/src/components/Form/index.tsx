import Button from '../Button'
import Heading from '../Heading'
import { FormAction, FormContainer } from './Form.styled'

interface IFormProps extends React.HTMLAttributes<HTMLFormElement> {
  id?: string
  title: string
  children?: React.ReactNode
  handleCancel: () => void
}

const Form = ({ id, title, children, handleCancel, ...props }: IFormProps) => {
  return (
    <FormContainer {...props}>
      {id && <input type='hidden' name='id' value={id} />}
      <Heading title={title} bottomBorder={true} />
      {children}
      <FormAction>
        <Button onClick={handleCancel} variant='primary' title='Cancel' />
        <Button type='submit' variant='primary' title='Save' />
      </FormAction>
    </FormContainer>
  )
}

export default Form
