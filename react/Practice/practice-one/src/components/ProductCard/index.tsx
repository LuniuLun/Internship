import closeIcon from '../../assets/icons/close.svg'
import editIcon from '../../assets/icons/edit.svg'
import ellipseIcon from '../../assets/icons/ellipse.svg'
import { IProduct } from '../../types/product'
import { Button, Heading, Image, Typography } from '../common'
import { ProductContainer, ProductDescription, ItemThin, EditIcon, ButtonStyled } from './ProductCard.styled'

interface IProductCardProps extends IProduct {
  onEdit: () => void
  onDelete: () => void
}

const ProductCard = ({ name, imageURL, price, quantity, onEdit, onDelete }: IProductCardProps) => {
  return (
    <ProductContainer>
      <ButtonStyled onClick={onDelete}>
        <Image src={closeIcon} alt='delete' />
      </ButtonStyled>
      <Image
        src={imageURL}
        alt={name}
        style={{
          marginTop: '20px'
        }}
      />
      <ProductDescription>
        <Heading as='h2' title={name} />
        <ItemThin>
          $<Typography variant='normal-thin'>{parseFloat(price).toFixed(2)}</Typography>
          <Image src={ellipseIcon} alt='-' size='sm' />
          <Typography variant='normal-thin'>{quantity}</Typography>
          {quantity === '1' ? 'Bowl' : 'Bowls'}
        </ItemThin>
      </ProductDescription>
      <Button variant='secondary' title='Edit dish' icon={editIcon} onClick={onEdit}>
        <EditIcon src={editIcon} alt='edit' />
      </Button>
    </ProductContainer>
  )
}

export default ProductCard
