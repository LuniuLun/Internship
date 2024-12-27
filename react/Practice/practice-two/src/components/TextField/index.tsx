import React, { forwardRef } from 'react'
import {
  Text,
  InputProps,
  InputGroup,
  InputLeftElement,
  Input,
  Stack,
  IconButton,
  InputRightElement
} from '@chakra-ui/react'
import colors from '@styles/variables/colors'
import { EyeIcon, CloseEyeIcon } from '@assets/icons'

export interface ITextFieldProps extends InputProps {
  icon?: React.ReactNode
  errorMessage?: string
}

const TextField = forwardRef<HTMLInputElement, ITextFieldProps>(
  (
    { value, onChange, placeholder, variant = 'unstyled', size = 'sm', errorMessage, icon, type = 'text', ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
    }

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    return (
      <Stack
        flex={1}
        display='flex'
        gap='unset'
        alignItems='center'
        justifyContent='center'
        backgroundColor='transparent'
        w='100%'
      >
        <InputGroup>
          {icon && (
            <InputLeftElement pointerEvents='none' height='100%' transform='translateX(30%)'>
              {React.cloneElement(icon as React.ReactElement)}
            </InputLeftElement>
          )}
          <Input
            errorBorderColor='red.300'
            paddingLeft={icon ? '40px' : '12px'}
            ref={ref}
            placeholder={placeholder}
            variant={variant}
            size={size}
            value={value}
            onChange={handleChange}
            type={type === 'password' && !showPassword ? 'password' : 'text'}
            {...props}
          />
          {type === 'password' && (
            <InputRightElement width='4.5rem'>
              <IconButton
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                icon={showPassword ? <CloseEyeIcon /> : <EyeIcon />}
                variant='link'
                onClick={togglePasswordVisibility}
                size='sm'
                color='gray.500'
              />
            </InputRightElement>
          )}
        </InputGroup>
        <Text alignSelf='flex-start' marginLeft='12px' color={colors.brand.red} fontSize='xs' fontWeight='light'>
          {errorMessage}
        </Text>
      </Stack>
    )
  }
)

export default TextField
