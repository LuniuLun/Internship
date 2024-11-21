import { Form, TextField } from '@components'
import { IProduct } from '@type/product'
import { checkImageURL, restrictIntegerInput, restrictRealNumberInput } from '@utilities'
import { useForm } from 'react-hook-form'

interface IProductFormProps {
  chosenProduct?: Partial<IProduct>
  handleCloseForm: () => void
  handleSubmit: (data: IProduct) => void
}

const ProductForm = ({ chosenProduct, handleCloseForm, handleSubmit }: IProductFormProps) => {
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors }
  } = useForm<IProduct>({
    defaultValues: {
      id: chosenProduct?.id || '',
      name: chosenProduct?.name || '',
      imageURL: chosenProduct?.imageURL || '',
      price: chosenProduct?.price || '',
      quantity: chosenProduct?.quantity || ''
    }
  })

  // Hàm submit form
  const onSubmit = (data: IProduct) => {
    handleSubmit(data)
  }

  return (
    <Form
      handleCancel={handleCloseForm}
      onSubmit={handleFormSubmit(onSubmit)}
      title={chosenProduct?.id ? 'Edit Product' : 'Add New Product'}
      className='slide-down'
    >
      <TextField {...register('id')} type='hidden' />

      <TextField
        {...register('name', { required: 'Name is required', minLength: 2, maxLength: 100 })}
        label='Name'
        errorMessage={errors.name?.message}
      />

      <TextField
        {...register('imageURL', {
          required: 'Image URL is required',
          validate: {
            checkImageURL: async (value) => {
              const result = await checkImageURL('Image URL', value)
              return result || true
            }
          }
        })}
        label='Image URL'
        errorMessage={errors.imageURL?.message}
      />

      <TextField
        {...register('price', {
          required: 'Price is required',
          pattern: {
            value: /^[0-9]*\.?[0-9]+$/,
            message: 'Invalid price format'
          }
        })}
        label='Price'
        errorMessage={errors.price?.message}
        onKeyDown={(e) => restrictRealNumberInput(e)}
      />

      <TextField
        {...register('quantity', {
          required: 'Quantity is required',
          pattern: {
            value: /^[0-9]+$/,
            message: 'Quantity must be an integer'
          }
        })}
        label='Quantity'
        dimension='sm'
        errorMessage={errors.quantity?.message}
        onKeyDown={(e) => restrictIntegerInput(e)}
      />
    </Form>
  )
}

export default ProductForm
