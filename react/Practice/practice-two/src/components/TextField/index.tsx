import React, { forwardRef } from 'react'
import { Input, Wrapper, Icon } from './TextField.styled'
import { Text } from '@chakra-ui/react'
import { TBoder, TDimensionInput } from '@type/variant'

export interface ITextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  placeholder: string
  border?: TBoder
  dimension?: TDimensionInput
  iconSrc?: string
  errorMessage?: string
}

const TextField = forwardRef<HTMLInputElement, ITextFieldProps>(
  ({ name, placeholder, errorMessage, dimension = 'sm', iconSrc, border = 'thin', ...props }, ref) => {
    return (
      <Wrapper>
        {iconSrc && <Icon src={iconSrc} alt={name} />}
        <Input ref={ref} name={name} placeholder={placeholder} $dimension={dimension} $border={border} {...props} />
        <Text color='brand.red' fontSize={'xs'} fontWeight={'light'}>
          {errorMessage}
        </Text>
      </Wrapper>
    )
  }
)

export default TextField
