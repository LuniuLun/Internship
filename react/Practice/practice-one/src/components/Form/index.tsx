import Button from '../Button'
import Heading from '../Heading'
import { FormAction, FormContainer } from './Form.styled'

interface IFormProps extends React.HTMLAttributes<HTMLFormElement> {
  id?: string
  title: string
  children?: React.ReactNode
}

const Form = ({ id, title, children, ...props }: IFormProps) => {
  return (
    <FormContainer className='slide-down' {...props}>
      {id && <input type='hidden' name='id' value={id} />}
      <Heading title={title} bottomBorder={true} />
      {children}
      <FormAction>
        <Button variant='primary' title='Cancel' />
        <Button variant='primary' title='Save' />
      </FormAction>
    </FormContainer>
  )
}

export default Form
