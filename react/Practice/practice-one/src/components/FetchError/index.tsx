import { FetchErrorStyled } from './FetchError.styled'

interface IFetchErrorProps {
  title: string
}

const FetchError = ({ title }: IFetchErrorProps) => {
  return <FetchErrorStyled>{title}</FetchErrorStyled>
}

export default FetchError
