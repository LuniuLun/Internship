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

  const handleEdit = (id: string) => {
    console.log('Edit product with ID:', id)
    setShowPopup(true)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    console.log('Delete product with ID:', id)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    for (const [key, value] of formData) {
      console.log(`You searched for ${key}: ${value}\n`)
    }
  }

  return (
    <HomeStyled>
      <WrapperProducts>
        <AdditionalCard onClick={() => setShowPopup(true)}>
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
            onEdit={() => handleEdit(id)}
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
            <Form onSubmit={handleSubmit} title='Add new food'>
              <TextField name='name' label='Name' />
              <TextField name='imageURL' label='Image URL' />
              <TextField name='price' label='Price' />
              <TextField name='quantity' label='Quantity' size='sm' />
            </Form>
          )}
        </WrapperPopup>
      )}
    </HomeStyled>
  )
}

export default Home
