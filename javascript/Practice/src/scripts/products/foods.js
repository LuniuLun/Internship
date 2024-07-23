import ProductService from '../services/product'
import ProductTemplate from '../template/product'

class Foods {
  constructor() {
    this.instance = this
    this.productTemplate = ProductTemplate.getInstance()
    this.productService = ProductService.getInstance()
  }

  static getInstance() {
    if (!Foods.instance) {
      Foods.instance = new Foods()
    }
    return Foods.instance
  }

  async renderProduct() {
    const renderProductEle = document.querySelector('.js-get-products')
    let html = ``
    try {
      const products = await this.productService.getProduct()
      products.forEach((item) => {
        html += ProductTemplate.renderProductCard(item)
      })
      renderProductEle.innerHTML += html
    } catch (error) {
      console.error('Error rendering product:', error)
    }
  }
}

export default Foods
