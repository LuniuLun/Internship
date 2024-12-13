import React, { forwardRef } from 'react'
import { Text, Box, InputProps, InputGroup, InputLeftElement, Input } from '@chakra-ui/react'
import colors from '@styles/variables/colors'

export interface ITextFieldProps extends InputProps {
  placeholder?: string
  icon?: React.ReactNode
  errorMessage?: string
}

const TextField = forwardRef<HTMLInputElement, ITextFieldProps>(
  ({ placeholder, errorMessage, icon, ...props }, ref) => {
    return (
      <Box
        flex='1'
        display='flex'
        alignItems='center'
        justifyContent='center'
        flexDirection='column'
        backgroundColor='transparent'
      >
        <InputGroup>
          {icon && (
            <InputLeftElement pointerEvents='none' height='100%' transform='translateX(30%)'>
              {React.cloneElement(icon as React.ReactElement)}
            </InputLeftElement>
          )}
          <Input errorBorderColor='red.300' ref={ref} placeholder={placeholder} {...props} />
        </InputGroup>
        <Text alignSelf={'flex-start'} marginLeft={'12px'} color={colors.brand.red} fontSize='xs' fontWeight='light'>
          {errorMessage}
        </Text>
      </Box>
    )
  }
)

export default TextField
