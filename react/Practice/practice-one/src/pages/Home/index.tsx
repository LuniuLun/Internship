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
import { fetchProducts, getMoreProduct, submitProduct } from '../../models/product'
import { IProduct } from '../../types/product'
import { IToastMessageProps } from '../../components/ToastMessage'

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [chosenProduct, setChosenProduct] = useState<IProduct | null>(null)
  const [showPopup, setShowPopup] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [notification, setNotification] = useState<IToastMessageProps>({
    status: 'error',
    message: ''
  })

  useEffect(() => {
    setShowPopup(true)
    setShowLoader(true)

    const fetchData = async () => {
      try {
        const response = await fetchProducts({})

        if (response) {
          setShowNotification(true)
          setNotification({
            status: response.status as IToastMessageProps['status'],
            message: response.message
          })

          setTimeout(() => {
            setShowNotification(false)
          }, 3000)

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
    for (const [name, value] of formData) {
      console.log(`You searched for ${name}: ${value}\n`)
    }
    handleCloseWarning()
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newProduct: IProduct = { id: '', name: '', imageURL: '', price: '', quantity: '' }
    const formData = new FormData(event.target as HTMLFormElement)
    for (const [key, value] of formData.entries()) {
      if (key in newProduct) {
        newProduct[key as keyof IProduct] = value as string
      }
    }

    handleCloseForm()

    const submitData = async () => {
      try {
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
          }, 3000)
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
    console.log(`Updated limit: ${newLimit}`)
    console.log(`Data limit: ${limit}`)
    console.log(limit, products.length)

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
            }, 3000)

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
              <TextField name='name' label='Name' value={chosenProduct?.name ? chosenProduct.name : ''} />
              <TextField
                name='imageURL'
                label='Image URL'
                value={chosenProduct?.imageURL ? chosenProduct.imageURL : ''}
              />
              <TextField name='price' label='Price' value={chosenProduct?.price ? chosenProduct.price : ''} />
              <TextField
                name='quantity'
                label='Quantity'
                dimension='sm'
                value={chosenProduct?.quantity ? chosenProduct.quantity : ''}
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
