class Template {
  constructor() {
    this.instance = this
  }

  static getInstance() {
    if (!Template.instance) {
      Template.instance = new Template()
    }
    return Template.instance
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

  renderProductCard({ id, name, imageURL, price, quantity }) {
    return `
            <div class="product" id="${id}">
              <img
                class="product__icon"
                src="./assets/icons/close.svg"
                alt="delete food"
              />
              <img
                class="product__img"
                src="${imageURL}"
                alt="Spicy seasoned seafood noodles"
              />
              <div class="product__description">
                <h4 class="item">${name}</h4>
                <p class="item item--thin">
                  $ ${price}
                  <img src="./assets/icons/ellipse.svg" alt="space" />
                  ${quantity} Bowls
                </p>
              </div>
              <button class="product__btn">
                <img src="./assets/icons/edit.svg" alt="edit food" />
                Edit dish
              </button>
            </div>`
  }
}

export default Template
