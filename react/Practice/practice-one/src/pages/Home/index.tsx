import { Button, Form, ProductCard, TextField } from '../../components'
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
import { fetchProducts } from '../../models/product'
import { IProduct } from '../../types/product'

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [chosenProduct, setChosenProduct] = useState<IProduct | null>(null)
  const [showPopup, setShowPopup] = useState(false)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getData = await fetchProducts({})
        console.log(getData)

        setProducts(getData)
      } finally {
        console.log(123)
      }
    }
    return () => {
      fetchData()
    }
  }, [])

  const handleShowPopup = () => {
    setShowPopup(true)
    setShowForm(true)
  }

  const handleClosePopup = () => {
    setShowPopup(false)
    setShowForm(false)
  }

  const handleEdit = (product: IProduct) => {
    setChosenProduct(product)
    console.log('Edit product:', chosenProduct)
    handleShowPopup()
  }

  const handleDelete = (id: string) => {
    console.log('Delete product with ID:', id)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    for (const [name, value] of formData) {
      console.log(`You searched for ${name}: ${value}\n`)
    }
    setChosenProduct(null)
  }

  return (
    <HomeStyled>
      <WrapperProducts>
        <AdditionalCard onClick={handleShowPopup}>
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
            onEdit={() => handleEdit({ id, name, imageURL, price, quantity })}
            onDelete={() => handleDelete(id)}
          />
        ))}
      </WrapperProducts>
      <WrapperBtn>
        <Button variant='primary' title='Show more' />
      </WrapperBtn>
      {showPopup && (
        <WrapperPopup>
          {showForm && (
            <Form handleCancel={handleClosePopup} onSubmit={handleSubmit} title='Add new food' className='slide-down'>
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
        </WrapperPopup>
      )}
    </HomeStyled>
  )
}

export default Home
