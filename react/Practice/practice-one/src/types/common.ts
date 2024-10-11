import { TButtonVariant, TSizeVariant, TStatusVariant } from './variant'

export interface IButtonProps {
  variant?: TButtonVariant
  size?: TSizeVariant
  icon?: string
  title: string
  onClick?: () => void
}

export interface ITextFieldProps {
  name: string
  size: TSizeVariant
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  error?: string
}

export interface IToastMessageProps {
  status: TStatusVariant
  message: string
}

export interface IDropdownOption {
  src?: string
  handleOnClick?: () => void
  titleOption: string
}

export interface IDropdownProps {
  title: string
  options: IDropdownOption[]
}

export interface IHeadingProps {
  title: string
}
