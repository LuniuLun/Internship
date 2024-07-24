import editIcon from '../../assets/icons/edit.svg'
import closeIcon from '../../assets/icons/close.svg'
import ellipseIcon from '../../assets/icons/ellipse.svg'

class ProductTemplate {
  constructor() {
    this.instance = this
  }

  static getInstance() {
    if (!ProductTemplate.instance) {
      ProductTemplate.instance = new ProductTemplate()
    }
    return ProductTemplate.instance
  }

  static renderForm({
    id = '',
    name = '',
    imageURL = '',
    price = '1',
    quantity = '1',
  }) {
    return `
        <form action="" class="form form--center" id="js-product-form">
          <input type="hidden" name="id" value="${id}" />
          <h2 class="form__title">${id !== '' ? 'Edit' : 'Add'}</h2>
          <label for="name" class="form__label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            class="text-field"
            value="${name}"
          />
          <span class="form__error js-name-error"></span>
          <label for="price" class="form__label">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            class="text-field"
            value="${price}"
          />
          <span class="form__error js-price-error"></span>
          <label for="imageURL" class="form__label">Image URL</label>
          <input
            type="text"
            id="imageURL"
            name="imageURL"
            class="text-field"
            value="${imageURL}"
          />
          <span class="form__error js-imageURL-error"></span>
          <label for="quantity" class="form__label">Quantity</label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            class="text-field text-field--short"
            value="${quantity}"
          />
          <span class="form__error js-quantity-error"></span>
          <div class="form__action">
            <input class="btn btn--line js-hidden-form" value="Cancel" />
            <input type="submit" class="btn btn--fill" value="Save" />
          </div>
        </form>`
  }

  static renderProductCard({ id, name, imageURL, price, quantity }) {
    return `
            <div class="product" id="${id}">
              <img class="icon product__icon" src="${closeIcon}" />
              <img
                class="product__img"
                src="${imageURL}"
                alt="${name}"
              />
              <div class="product__description">
                <h4 class="item">${name}</h4>
                <p class="item item--thin">
                  $ ${price}
                  <img class="icon" src="${ellipseIcon}" />
                  ${quantity} Bowls
                </p>
              </div>
              <button class="product__btn js-edit-form" id="${id}">
                <img class="icon" src="${editIcon}" />
                Edit dish
              </button>
            </div>`
  }
}

export default ProductTemplate
