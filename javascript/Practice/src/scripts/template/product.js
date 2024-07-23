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

  static renderForm() {
    return `
          <form action="" class="form">
            <h2 class="form__title">Edit</h2>
            <label for="name">Name</label>
            <input type="text" id="name" name="name" class="text-field" />
            <label for="price">Price</label>
            <input type="text" id="price" name="price" class="text-field" />
            <label for="imageURL">Image URL</label>
            <input type="text" id="imageURL" name="imageURL" class="text-field" />
            <label for="quantity">Quantity</label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              class="text-field text-field--short"
              value="1"
            />
            <div class="form__action">
              <button class="btn btn--line js-hidden-form">Cancel</button>
              <button class="btn btn--fill">Save</button>
            </div>
          </form>`
  }

  static renderProductCard({ id, name, imageURL, price, quantity }) {
    return `
            <div class="product" id="${id}">
              <svg class="icon product__icon" width="21" height="21" viewBox="0 0 21 21">
                <use xlink:href="./assets/icons/icons.svg#close" />
              </svg>
              <img
                class="product__img"
                src="${imageURL}"
                alt="Spicy seasoned seafood noodles"
              />
              <div class="product__description">
                <h4 class="item">${name}</h4>
                <p class="item item--thin">
                  $ ${price}
                  <svg class="icon" width="4" height="4" viewBox="0 0 4 4">
                    <use xlink:href="./assets/icons/icons.svg#ellipse" />
                  </svg>
                  ${quantity} Bowls
                </p>
              </div>
              <button class="product__btn">
                <svg class="icon" width="16" height="16" viewBox="0 0 16 16">
                  <use xlink:href="./assets/icons/icons.svg#edit" />
                </svg>
                Edit dish
              </button>
            </div>`
  }
}

export default ProductTemplate
