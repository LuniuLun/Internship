import editIcon from '../../assets/icons/edit.svg'
import closeIcon from '../../assets/icons/close.svg'
import ellipseIcon from '../../assets/icons/ellipse.svg'
import plus from '../../assets/icons/plus.svg'

class ProductTemplate {
  constructor() {
    this.instance = this
  }

  /**
   * Singleton pattern to ensure only one instance of ProductTemplate exists.
   * @returns {ProductTemplate} The instance of ProductTemplate.
   */
  static getInstance() {
    if (!ProductTemplate.instance) {
      ProductTemplate.instance = new ProductTemplate()
    }
    return ProductTemplate.instance
  }

  /**
   * Renders an HTML form for creating or editing a product.
   * @param {Object} params - The product details for the form.
   * @param {string} [params.id=''] - The ID of the product (for editing).
   * @param {string} [params.name=''] - The name of the product.
   * @param {string} [params.imageURL=''] - The image URL of the product.
   * @param {string} [params.price='1'] - The price of the product.
   * @param {string} [params.quantity='1'] - The quantity of the product.
   * @returns {string} The HTML string for the form.
   */
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
          <h2 class="form__title">${id !== '' ? 'Edit' : 'Create a new food'}</h2>
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
            class="text-field js-check-imageURL"
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

  /**
   * Renders an HTML card for displaying a product.
   * @param {Object} params - The product details for the card.
   * @param {string} params.id - The ID of the product.
   * @param {string} params.name - The name of the product.
   * @param {string} params.imageURL - The image URL of the product.
   * @param {string} params.price - The price of the product.
   * @param {string} params.quantity - The quantity of the product.
   * @returns {string} The HTML string for the product card.
   */
  static renderProductCard({ id, name, imageURL, price, quantity }) {
    return `
            <div class="product" id="${id}">
              <img class="icon product__icon js-get-popup" src="${closeIcon}" id="${id}"/>
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

  /**
   * Renders an HTML card for adding a new product.
   * @returns {string} The HTML string for the addition card.
   */
  static renderAdditionCard() {
    return `            
            <div class="product product--dashed js-get-form">
              <img
                class="icon icon--padded"
                src="${plus}"
                alt="add food"
              />
              <span class="highlight">Add new dish</span>
            </div>`
  }
}

export default ProductTemplate
