import ProductService from '../services/product'
import ProductTemplate from '../template/product'
import Message from '../constants/message'

class Product {
  constructor() {
    this.instance = this
    this.productTemplate = ProductTemplate.getInstance()
    this.productService = ProductService.getInstance()
    this.message = Message.getInstance()
  }

  static getInstance() {
    if (!Product.instance) {
      Product.instance = new Product()
    }
    return Product.instance
  }

  async renderProduct() {
    const renderProductEle = document.querySelector('.js-get-products')

    let html = ``
    const products = await this.productService.getProduct()
    products.forEach((item) => {
      html += ProductTemplate.renderProductCard(item)
    })
    renderProductEle.innerHTML += html
  }

  async getProductById(id) {
    const currentProduct = await this.productService.getProductById(id)
    return currentProduct
  }

  async submitProduct(newProduct) {
    if (newProduct.id !== '') {
      await this.editProduct(newProduct)
    } else {
      await this.addProduct(newProduct)
    }
  }

  async addProduct(newProduct) {
    const response = await this.productService.addProduct(newProduct)
    if (response) {
      localStorage.setItem('Message', this.message.ADD_PRODUCT_SUCCESS)
      window.location.reload()
    }
  }

  async editProduct(newProduct) {
    const response = await this.productService.editProduct(newProduct)
    if (response) {
      localStorage.setItem('Message', this.message.EDIT_PRODUCT_SUCCESS)
      window.location.reload()
    }
  }
}

export default Product
