import { HeadingStyled } from './Heading.styled'

export interface IHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string
  bottomBorder?: boolean
}

const Heading = ({ title, bottomBorder, ...props }: IHeadingProps) => {
  return (
    <HeadingStyled bottomBorder={bottomBorder} {...props}>
      {title}
    </HeadingStyled>
  )
}

export default Heading
