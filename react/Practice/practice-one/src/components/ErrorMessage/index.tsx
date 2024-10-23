import { Error } from './ErrorMessage.styled'

interface IErrorMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  title: string
}

const ErrorMessage = ({ title, ...props }: IErrorMessageProps) => {
  return (
    <Error className='normal-medium-text' {...props}>
      {title}
    </Error>
  )
}

export default ErrorMessage
