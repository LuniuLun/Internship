import { HeadingStyled } from './Heading.styled'

export interface IHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string
  as?: 'h1' | 'h2'
}

const Heading = ({ title, as = 'h1', ...props }: IHeadingProps) => {
  return (
    <HeadingStyled as={as} {...props}>
      {title}
    </HeadingStyled>
  )
}

export default Heading
