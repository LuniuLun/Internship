import { HeadingStyled } from './Heading.styled'

export interface IHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string
}

const Heading = ({ title, ...props }: IHeadingProps) => {
  return <HeadingStyled {...props}>{title}</HeadingStyled>
}

export default Heading
