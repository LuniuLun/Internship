import closeIcon from '../../assets/icons/close.svg'
import editIcon from '../../assets/icons/edit.svg'
import ellipseIcon from '../../assets/icons/ellipse.svg'
import defaultImage from '../../assets/images/default-image.svg'
import Button from '../Button'
import { ProductContainer, ProductIcon, ProductImage, ProductDescription, Item, ItemThin } from './ProductCard.styled'

interface ProductProps {
  id: string
  name: string
  imageURL: string
  price: number
  quantity: number
  onEdit: () => void
  onDelete: () => void
}

const ProductCard: React.FC<ProductProps> = ({ id, name, imageURL, price, quantity, onEdit, onDelete }) => {
  const bowlText = quantity === 1 ? 'Bowl' : 'Bowls'

  return (
    <ProductContainer data-id={id}>
      <ProductIcon src={closeIcon} alt='Delete product' onClick={onDelete} />
      <ProductImage
        src={imageURL}
        alt={name}
        onError={(e) => {
          ;(e.target as HTMLImageElement).src = defaultImage
        }}
      />
      <ProductDescription>
        <Item className='normal-medium-text'>{name}</Item>
        <ItemThin className='normal-thin-text'>
          $ <span>{parseFloat(price.toFixed(2))}</span>
          <img src={ellipseIcon} alt='-' />
          <span>{quantity}</span> {bowlText}
        </ItemThin>
      </ProductDescription>
      <Button variant='secondary' title='Edit dish' icon={editIcon} onClick={onEdit} />
    </ProductContainer>
  )
}

export default ProductCard
