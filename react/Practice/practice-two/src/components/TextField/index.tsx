import React, { forwardRef } from 'react'
import { Text, InputProps, InputGroup, InputLeftElement, Input, Stack } from '@chakra-ui/react'
import colors from '@styles/variables/colors'

export interface ITextFieldProps extends InputProps {
  icon?: React.ReactNode
  errorMessage?: string
}

const TextField = forwardRef<HTMLInputElement, ITextFieldProps>(
  ({ placeholder, variant = 'unstyled', size = 'sm', errorMessage, icon, ...props }, ref) => {
    return (
      <Stack flex='1' display='flex' alignItems='center' justifyContent='center' backgroundColor='transparent'>
        <InputGroup>
          {icon && (
            <InputLeftElement pointerEvents='none' height='100%' transform='translateX(30%)'>
              {React.cloneElement(icon as React.ReactElement)}
            </InputLeftElement>
          )}
          <Input
            errorBorderColor='red.300'
            ref={ref}
            placeholder={placeholder}
            variant={variant}
            size={size}
            {...props}
          />
        </InputGroup>
        <Text alignSelf={'flex-start'} marginLeft={'12px'} color={colors.brand.red} fontSize='xs' fontWeight='light'>
          {errorMessage}
        </Text>
      </Stack>
    )
  }
)

export default TextField
