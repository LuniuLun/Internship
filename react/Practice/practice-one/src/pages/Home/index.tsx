import { Button, ProductCard } from '../../components'
import foodData from '../../Data/food'
import { AdditionalCard, AdditionalDes, AdditionalIcon, HomeStyled, WrapperBtn, WrapperProducts } from './Home.styled'
import plus from '../../assets/icons/plus.svg'
function Home() {
  const handleEdit = (id: string) => {
    console.log('Edit product with ID:', id)
  }

  const handleDelete = (id: string) => {
    console.log(id)
  }

  return (
    <HomeStyled>
      <WrapperProducts>
        <AdditionalCard>
          <AdditionalIcon src={plus} alt='add food'></AdditionalIcon>
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
    </HomeStyled>
  )
}
export default Home
