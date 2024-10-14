import { Button, Form, ProductCard, TextField } from '../../components'
import foodData from '../../Data/food'
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
import { FormEvent, useState } from 'react'

const Home = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [showForm, setShowForm] = useState(false)

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
        {foodData.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageURL={product.imageURL}
            price={product.price}
            quantity={product.quantity}
            onEdit={() => handleEdit(product.id)}
            onDelete={() => handleDelete(product.id)}
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
