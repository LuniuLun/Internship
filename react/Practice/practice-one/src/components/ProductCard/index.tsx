import styles from './ProductCard.module.css'
import closeIcon from '../../assets/icons/close.svg'
import editIcon from '../../assets/icons/edit.svg'
import ellipseIcon from '../../assets/icons/ellipse.svg'
import defaultImage from '../../assets/images/default-image.svg'

interface ProductProps {
  id: string
  name: string
  imageURL: string
  price: string
  quantity: string
  onEdit: () => void
  onDelete: () => void
}

const ProductCard: React.FC<ProductProps> = ({ id, name, imageURL, price, quantity, onEdit, onDelete }) => {
  const bowlText = quantity === '1' ? 'Bowl' : 'Bowls'

  return (
    <div className={styles.product} data-id={id}>
      <img
        className={`${styles.icon} ${styles.product__icon}`}
        src={closeIcon}
        alt='Delete product'
        onClick={onDelete} // handle click to delete
      />
      <img
        className={styles.product__img}
        src={imageURL}
        alt={name}
        onError={(e) => {
          ;(e.target as HTMLImageElement).src = defaultImage
        }}
      />
      <div className={styles.product__description}>
        <h4 className={`${styles.item} ${styles.item__name} normal-medium-text`}>{name}</h4>
        <p className={`${styles.item} ${styles.item__thin} normal-thin-text`}>
          $ <span>{parseFloat(price).toFixed(2)}</span>
          <img className={styles.icon} src={ellipseIcon} alt='Ellipse' />
          <span>{quantity}</span> {bowlText}
        </p>
      </div>
      <button className={`${styles.product__btn} normal-semiBold-txtBtn`} onClick={onEdit}>
        <img className={styles.icon} src={editIcon} alt='Edit product' />
        Edit dish
      </button>
    </div>
  )
}

export default ProductCard
