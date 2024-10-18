import { ErrorStateStyled } from './ErrorState.styled'

interface IErrorStateProps {
  title: string
}

function ErrorState({ title }: IErrorStateProps) {
  return <ErrorStateStyled>{title}</ErrorStateStyled>
}

export default ErrorState
