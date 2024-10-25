import { LabelStyled } from './Label.styled'

interface ILabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  title: string
  htmlFor?: string
}

const Label = ({ title, htmlFor, ...props }: ILabelProps) => {
  return (
    <LabelStyled htmlFor={htmlFor} className='normal-medium-text' {...props}>
      {title}
    </LabelStyled>
  )
}

export default Label
