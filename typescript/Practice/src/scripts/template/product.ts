import editIcon from '../../assets/icons/edit.svg'
import closeIcon from '../../assets/icons/close.svg'
import ellipseIcon from '../../assets/icons/ellipse.svg'
import plus from '../../assets/icons/plus.svg'
import defaultImage from '../../assets/images/default-image.svg'

function renderProductCard({
  id,
  name,
  imageURL,
  price,
  quantity,
}: TProduct): string {
  const bowlText = quantity === '1' ? 'Bowl' : 'Bowls'
  return `
      <div class="product" data-id="${id}">
        <img class="icon product__icon js-get-warning" src="${closeIcon}" id="${id}" />
        <img
          class="product__img js-get-imageURL"
          src="${imageURL}"
          alt="${name}"
          onerror="this.onerror=null; this.src='${defaultImage}'"
        />
        <div class="product__description">
          <h4 class="item js-get-name">${name}</h4>
          <p class="item item--thin">
            $ 
            <span class="js-get-price">${parseFloat(price).toFixed(2)}</span>
            <img class="icon" src="${ellipseIcon}" />
            <span class="js-get-quantity">${quantity}</span>
            ${bowlText}
          </p>
        </div>
        <button class="product__btn js-edit-product">
          <img class="icon" src="${editIcon}" />
          Edit dish
        </button>
      </div>`
}

function renderAdditionCard(): string {
  return `
      <div class="product product--dashed js-add-product">
        <img
          class="icon icon--padded"
          src="${plus}"
          alt="add food"
        />
        <span class="highlight">Add new dish</span>
      </div>`
}

export default { renderProductCard, renderAdditionCard }
