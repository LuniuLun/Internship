import React, { forwardRef } from 'react'
import { Input, Text, Image, Box } from '@chakra-ui/react'
import { TBoder, TDimensionInput } from '@type/variant'
import colors from '@styles/variables/colors'

export interface ITextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  placeholder: string
  border?: TBoder
  dimension?: TDimensionInput
  iconSrc?: string
  errorMessage?: string
}

const TextField = forwardRef<HTMLInputElement, ITextFieldProps>(
  ({ name, placeholder, errorMessage, dimension = 'sm', iconSrc, border = 'thin' }, ref) => {
    return (
      <Box
        flex='1'
        position='relative'
        display='flex'
        alignItems='center'
        justifyContent='center'
        flexDirection={'column'}
        backgroundColor={colors.brand.white}
      >
        {iconSrc && (
          <Image
            src={iconSrc}
            alt={name}
            position='absolute'
            left='12px'
            top='50%'
            transform='translateY(-50%)'
            zIndex='2'
          />
        )}
        <Input
          ref={ref}
          name={name}
          placeholder={placeholder}
          borderRadius='2xl'
          border={border === 'thin' ? `1px solid ${colors.brand.secondary}` : 'none'}
          width='100%'
          height={'unset'}
          padding={dimension === 'md' ? '12px 16px' : '9px 12px'}
          paddingLeft={iconSrc ? '40px' : '12px'}
          fontSize={'md'}
          lineHeight={dimension === 'md' ? '24px' : '16px'}
          color={colors.brand.blackTextPrimary}
          backgroundColor={colors.brand.white}
        />
        <Text alignSelf={'flex-start'} marginLeft={'12px'} color={colors.brand.red} fontSize='xs' fontWeight='light'>
          {errorMessage}
        </Text>
      </Box>
    )
  }
)

export default TextField
