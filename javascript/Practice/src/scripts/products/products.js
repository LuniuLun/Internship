import Template from '../template/product'
import ProductService from '../services/product'

class Products {
  constructor() {
    this.instance = this
    this.productTemplate = Template.getInstance()
    this.productService = ProductService.getInstance()
  }

  static getInstance() {
    if (!Products.instance) {
      Products.instance = new Products()
    }
    return Products.instance
  }

  async renderProduct() {
    const renderProductEle = document.querySelector('.js-get-products')
    let html = `            
            <div class="product product--dashed js-get-form">
              <img
                class="icon icon--padded"
                src="./assets/icons/plus.svg"
                alt="plus icon"
              />
              <span class="highlight">Add new dish</span>
            </div>`
    try {
      const products = await this.productService.getProduct()
      products.forEach((item) => {
        html += this.productTemplate.renderProductCard(
          item.id,
          item.name,
          item.imageURl,
          item.price,
          item.quantity,
        )
      })
      renderProductEle.innerHTML = html
    } catch (error) {
      console.error('Error rendering product:', error)
    }
  }
}

export default Products
