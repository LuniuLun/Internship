import closeIcon from '../../assets/icons/close.svg'
import editIcon from '../../assets/icons/edit.svg'
import ellipseIcon from '../../assets/icons/ellipse.svg'
import { IProduct } from '../../types/product'
import { Button, Image, Typography } from '../common'
import { ProductContainer, ProductIcon, ProductDescription, ItemThin } from './ProductCard.styled'

interface IProductCardProps extends IProduct {
  onEdit: () => void
  onDelete: () => void
}

const ProductCard = ({ id, name, imageURL, price, quantity, onEdit, onDelete }: IProductCardProps) => {
  const bowlText = quantity === '1' ? 'Bowl' : 'Bowls'

  return (
    <ProductContainer data-id={id}>
      <ProductIcon src={closeIcon} alt='Delete product' onClick={onDelete} />
      <Image src={imageURL} alt={name} />
      <ProductDescription>
        <Typography as='h4'>{name}</Typography>
        <ItemThin>
          $
          <Typography as='span' variant='normal-thin'>
            {parseFloat(price).toFixed(2)}
          </Typography>
          <img src={ellipseIcon} alt='-' />
          <Typography as='span' variant='normal-thin'>
            {quantity}
          </Typography>
          {bowlText}
        </ItemThin>
      </ProductDescription>
      <Button variant='secondary' title='Edit dish' icon={editIcon} onClick={onEdit} />
    </ProductContainer>
  )
}

export default ProductCard
