import { Flex, FormControl, Stack } from '@chakra-ui/react'
import { CustomModal, CustomSelect, ModulePermission, TextField } from '@components'
import { ROLE_OPTION } from '@constants/option'
import { IUser } from '@type/models'
import { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

interface UserFormData extends Omit<IUser, 'id'> {
  confirmPassword?: string
}

interface UserModalProps {
  selectedUser?: IUser | null
  isModalOpen: boolean
  onClose: () => void
  handleSubmit: (data: IUser) => void
}

const UserModal = ({ selectedUser, isModalOpen, onClose, handleSubmit }: UserModalProps) => {
  const {
    register,
    handleSubmit: onSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<UserFormData>({
    defaultValues: {
      firstName: selectedUser?.firstName || '',
      lastName: selectedUser?.lastName || '',
      email: selectedUser?.email || '',
      phone: selectedUser?.phone || '',
      role: selectedUser?.role || '',
      username: selectedUser?.username || '',
      password: selectedUser?.password || ''
    }
  })

  useEffect(() => {
    if (selectedUser) {
      setValue('firstName', selectedUser.firstName)
      setValue('lastName', selectedUser.lastName)
      setValue('email', selectedUser.email)
      setValue('phone', selectedUser.phone)
      setValue('role', selectedUser.role)
      setValue('username', selectedUser.username)
      setValue('password', selectedUser.password)
    }
  }, [selectedUser, setValue])

  useEffect(() => {
    if (!isModalOpen) {
      reset()
    }
  }, [isModalOpen, reset])

  const onFormSubmit: SubmitHandler<UserFormData> = (data) => {
    const userData = { ...data }
    delete userData.confirmPassword
    const user: IUser = {
      id: selectedUser?.id || '',
      ...userData,
      createDate: selectedUser?.createDate || new Date(Date.now())
    }
    handleSubmit(user)
  }

  return (
    <CustomModal
      size={'6xl'}
      isOpen={isModalOpen}
      onClose={onClose}
      title={selectedUser?.id ? 'Edit User' : 'Add User'}
      handleSubmit={onSubmit(onFormSubmit)}
    >
      <Stack gap={4} px={4}>
        <Flex gap={4} marginTop={4} flexDirection={{ base: 'column', md: 'row' }}>
          <FormControl>
            <TextField
              placeholder='First Name *'
              {...register('firstName', {
                required: 'Please enter First Name',
                minLength: { value: 2, message: 'First Name must have at least 2 characters' }
              })}
              errorMessage={errors.firstName?.message}
              variant='outline'
              aria-label='firstName'
            />
          </FormControl>
          <FormControl>
            <TextField
              placeholder='Last Name *'
              {...register('lastName', {
                required: 'Please enter Last Name',
                minLength: { value: 2, message: 'Last Name must have at least 2 characters' }
              })}
              errorMessage={errors.lastName?.message}
              variant='outline'
              aria-label='lastName'
            />
          </FormControl>
        </Flex>
        <Flex gap={4} flexDirection={{ base: 'column', md: 'row' }}>
          <FormControl>
            <TextField
              placeholder='Email *'
              {...register('email', {
                required: 'Please enter Email',
                pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: 'Invalid email address' }
              })}
              errorMessage={errors.email?.message}
              variant='outline'
              aria-label='email'
            />
          </FormControl>
          <FormControl>
            <TextField
              placeholder='Mobile *'
              {...register('phone', {
                required: 'Please enter Mobile number',
                minLength: { value: 9, message: 'Mobile number must have at least 9 characters' },
                maxLength: { value: 11, message: 'Mobile number must have at most 11 characters' }
              })}
              type='number'
              errorMessage={errors.phone?.message}
              variant='outline'
              aria-label='phone'
            />
          </FormControl>
          <CustomSelect
            border='full'
            placeholder='Select Role'
            options={ROLE_OPTION}
            value={selectedUser?.role}
            borderRadius='2xl'
            maxW='100%'
            h='34px'
            fontWeight='light'
            aria-label='role'
            {...register('role', { required: 'Please select Role' })}
          />
        </Flex>
        <Flex gap={4} flexDirection={{ base: 'column', md: 'row' }}>
          <FormControl>
            <TextField
              placeholder='Username *'
              {...register('username', {
                required: 'Please enter Username',
                minLength: { value: 6, message: 'Username must have at least 6 characters' }
              })}
              errorMessage={errors.username?.message}
              variant='outline'
              aria-label='username'
            />
          </FormControl>
          <FormControl>
            <TextField
              placeholder='Password *'
              type='password'
              {...register('password', {
                required: 'Please enter Password',
                minLength: { value: 8, message: 'Password must have at least 8 characters' },
                validate: (value) => {
                  if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter'
                  if (!/[a-z]/.test(value)) return 'Password must contain at least one lowercase letter'
                  if (!/[0-9]/.test(value)) return 'Password must contain at least one number'
                  if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
                    return 'Password must contain at least one special character'
                  return true
                }
              })}
              errorMessage={errors.password?.message}
              variant='outline'
              aria-label='check-password'
            />
          </FormControl>
          <FormControl>
            <TextField
              placeholder='Confirm Password *'
              type='password'
              {...register('confirmPassword', {
                required: 'Please confirm your Password',
                validate: (value) => {
                  if (value !== getValues('password')) {
                    return 'Passwords do not match'
                  }
                  return true
                }
              })}
              errorMessage={errors.confirmPassword?.message}
              variant='outline'
              aria-label='confirmPassword'
            />
          </FormControl>
        </Flex>
      </Stack>
      <ModulePermission />
    </CustomModal>
  )
}

export default UserModal
