import { Button, Form, Loader, ProductCard, TextField, ToastMessage } from '../../components'
import {
  AdditionalCard,
  AdditionalDes,
  AdditionalIcon,
  HomeStyled,
  WrapperBtn,
  WrapperPopup,
  WrapperProducts
} from './Home.styled'
import plus from '../../assets/icons/plus.svg'
import { FormEvent, useEffect, useState } from 'react'
import { deleteProduct, fetchProducts, getMoreProduct, submitProduct } from '../../models/product'
import { IProduct } from '../../types/product'
import { IToastMessageProps } from '../../components/ToastMessage'
import { checkImageURL, checkName, checkPrice, checkQuantity } from '../../utilities/validationForm'

const errorMessagesDefault = { name: '', price: '', quantity: '', imageURL: '' }

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [chosenProduct, setChosenProduct] = useState<IProduct | null>(null)
  const [showPopup, setShowPopup] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [errorMessage, setErrorMessage] = useState(errorMessagesDefault)
  const [notification, setNotification] = useState<IToastMessageProps>({
    status: 'error',
    message: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setShowPopup(true)
        setShowLoader(true)

        const response = await fetchProducts({})

        if (response) {
          setShowNotification(true)
          setNotification({
            status: response.status as IToastMessageProps['status'],
            message: response.message
          })

          setTimeout(() => {
            setShowNotification(false)
          }, 2900)

          if (response.data && response.data.length > 0) {
            setProducts(response.data)
          }
        }
      } finally {
        setShowPopup(false)
        setShowLoader(false)
      }
    }

    fetchData()
    return () => {
      setShowNotification(false)
    }
  }, [])

  const handleShowForm = () => {
    setShowPopup(true)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowPopup(false)
    setShowForm(false)
    setChosenProduct(null)
    setErrorMessage(errorMessagesDefault)
  }

  const handleShowWarning = (product: IProduct) => {
    setChosenProduct(product)
    setShowPopup(true)
    setShowWarning(true)
    console.log('Show warning for product:', product)
  }

  const handleCloseWarning = () => {
    setShowPopup(false)
    setShowWarning(false)
  }

  const handleShowEditForm = (product: IProduct) => {
    setChosenProduct(product)
    console.log('Edit product:', product)
    handleShowForm()
  }

  const handleDelete = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const productId = formData.get('id') as string | null
    handleCloseWarning()

    if (productId) {
      const deleteData = async () => {
        try {
          setShowPopup(true)
          setShowLoader(true)
          const response = await deleteProduct(productId)

          if (response) {
            setShowNotification(true)
            setNotification({
              status: response.status as IToastMessageProps['status'],
              message: response.message
            })

            setTimeout(() => {
              setShowNotification(false)
            }, 2900)

            if (response.status === 'success' && response.data) {
              setProducts((preProducts) => {
                return preProducts.filter((product) => product.id !== response.data!.id)
              })
            }
          }
        } finally {
          setShowPopup(false)
          setShowLoader(false)
        }
      }

      deleteData()
      return () => {
        setShowNotification(false)
      }
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newProduct: IProduct = { id: '', name: '', imageURL: '', price: '', quantity: '' }
    const formData = new FormData(event.target as HTMLFormElement)
    for (const [key, value] of formData.entries()) {
      if (key in newProduct) {
        newProduct[key as keyof IProduct] = value as string
      }
    }

    const errors = {
      name: checkName('Name', newProduct.name) || '',
      price: checkPrice('Price', newProduct.price) || '',
      quantity: checkQuantity('Quantity', newProduct.quantity) || '',
      imageURL: (await checkImageURL('Image URL', newProduct.imageURL)) || ''
    }
    setErrorMessage(errors)

    const hasErrors = Object.values(errors).some((error) => error !== '')

    if (hasErrors) return

    handleCloseForm()

    const submitData = async () => {
      try {
        setShowPopup(true)
        setShowLoader(true)
        const response = await submitProduct(newProduct)

        if (response) {
          setShowNotification(true)
          setNotification({
            status: response.status as IToastMessageProps['status'],
            message: response.message
          })
          if (response.status === 'success' && response.data) {
            setProducts((preProducts) => {
              const productExists = preProducts.some((product) => product.id === response.data!.id)
              if (productExists) {
                return preProducts.map((product) => (product.id === response.data!.id ? response.data! : product))
              } else {
                return [response.data!, ...preProducts]
              }
            })
          }

          setTimeout(() => {
            setShowNotification(false)
          }, 2900)
        }
      } finally {
        setShowPopup(false)
        setShowLoader(false)
      }
    }

    submitData()
    return () => {
      setShowNotification(false)
    }
  }

  const handleShowMore = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const limitStr = event.currentTarget.dataset.limit
    const limit = limitStr ? parseInt(limitStr, 10) : 0
    const newLimit = limit + 10
    event.currentTarget.dataset.limit = newLimit.toString()

    if (limit - products.length <= 10) {
      setShowPopup(true)
      setShowLoader(true)

      const fetchData = async () => {
        try {
          const response = await getMoreProduct({ limit: limit.toString() })

          if (response) {
            setShowNotification(true)
            setNotification({
              status: response.status as IToastMessageProps['status'],
              message: response.message
            })

            setTimeout(() => {
              setShowNotification(false)
            }, 2900)

            if (response.status === 'success' && response.data && response.data.length > 0) {
              if (response.data?.length > 0) {
                setProducts((preProducts) => [...preProducts, ...response.data!])
              }
            }
          }
        } finally {
          setShowPopup(false)
          setShowLoader(false)
        }
      }

      fetchData()
      return () => {
        setShowNotification(false)
      }
    } else {
      setNotification({
        status: 'error',
        message: 'You have reached the maximum limit'
      })
    }
  }

  return (
    <HomeStyled>
      <WrapperProducts>
        <AdditionalCard onClick={handleShowForm}>
          <AdditionalIcon src={plus} alt='add food' />
          <AdditionalDes>Add new dish</AdditionalDes>
        </AdditionalCard>
        {products.map(({ id, name, imageURL, price, quantity }) => (
          <ProductCard
            key={id}
            id={id}
            name={name}
            imageURL={imageURL}
            price={price}
            quantity={quantity}
            onEdit={() => handleShowEditForm({ id, name, imageURL, price, quantity })}
            onDelete={() => handleShowWarning({ id, name, imageURL, price, quantity })}
          />
        ))}
      </WrapperProducts>
      <WrapperBtn>
        <Button variant='primary' title='Show more' data-limit='19' onClick={handleShowMore} />
      </WrapperBtn>
      {showPopup && (
        <WrapperPopup>
          {showForm && (
            <Form handleCancel={handleCloseForm} onSubmit={handleSubmit} title='Add new food' className='slide-down'>
              <TextField
                key={chosenProduct?.id}
                type='hidden'
                name='id'
                value={chosenProduct?.id ? chosenProduct.id : ''}
              />
              <TextField
                name='name'
                label='Name'
                value={chosenProduct?.name ? chosenProduct.name : ''}
                errorMessage={errorMessage.name}
              />
              <TextField
                name='imageURL'
                label='Image URL'
                value={chosenProduct?.imageURL ? chosenProduct.imageURL : ''}
                errorMessage={errorMessage.imageURL}
              />
              <TextField
                name='price'
                label='Price'
                value={chosenProduct?.price ? chosenProduct.price : ''}
                errorMessage={errorMessage.price}
              />
              <TextField
                name='quantity'
                label='Quantity'
                dimension='sm'
                value={chosenProduct?.quantity ? chosenProduct.quantity : ''}
                errorMessage={errorMessage.quantity}
              />
            </Form>
          )}
          {showWarning && (
            <Form
              title='Are you sure you want to delete this food?'
              onSubmit={handleDelete}
              handleCancel={handleCloseWarning}
              bottomBorderTitle={false}
              className='slide-down center-title'
            >
              <TextField
                key={chosenProduct?.id}
                type='hidden'
                name='id'
                value={chosenProduct?.id ? chosenProduct.id : ''}
              />
            </Form>
          )}
          {showLoader && <Loader />}
        </WrapperPopup>
      )}
      {showNotification && (
        <ToastMessage className='fade-in-out' status={notification.status} message={notification.message} />
      )}
    </HomeStyled>
  )
}

export default Home
