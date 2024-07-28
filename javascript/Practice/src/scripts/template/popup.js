class PopupTemplate {
  constructor() {
    this.instance = this
  }

  /**
   * Singleton pattern to ensure only one instance of PopupTemplate exists.
   * @returns {PopupTemplate} The instance of PopupTemplate.
   */
  static getInstance() {
    if (!PopupTemplate.instance) {
      PopupTemplate.instance = new PopupTemplate()
    }
    return PopupTemplate.instance
  }

  /**
   * Renders a popup HTML template for confirming a deletion action.
   * @param {string} id - The ID of the item to be deleted.
   * @returns {string} The HTML string for the popup.
   */
  static renderWarning(id) {
    return `          
          <div class="popup">
            <h2 class="popup__content">
              Are you sure you want to delete this food?
            </h2>
            <div class="popup__action">
              <button class="btn btn--line js-hidden-form">Cancel</button>
              <button class="btn btn--fill js-accept" id="${id}">Yes</button>
            </div>
          </div>`
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
  static renderProductForm({
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
}

export default PopupTemplate
