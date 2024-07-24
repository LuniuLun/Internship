import ProductService from '../services/product'
import ProductTemplate from '../template/product'
import Message from '../constants/message'

class Foods {
  constructor() {
    this.instance = this
    this.productTemplate = ProductTemplate.getInstance()
    this.productService = ProductService.getInstance()
    this.message = Message.getInstance()
  }

  static getInstance() {
    if (!Foods.instance) {
      Foods.instance = new Foods()
    }
    return Foods.instance
  }

  async renderProduct() {
    const renderProductEle = document.querySelector('.js-get-products')
    const message = localStorage.getItem('productAddMessage')

    let html = ``
    const products = await this.productService.getProduct()
    products.forEach((item) => {
      html += ProductTemplate.renderProductCard(item)
    })
    renderProductEle.innerHTML += html

    if (message) {
      const messageEle = document.querySelector('.message')
      const contentMessageEle = document.querySelector('.message__content')
      contentMessageEle.textContent = message
      messageEle.classList.add('show')

      localStorage.removeItem('productAddMessage')
    }
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
      localStorage.setItem(
        'productAddMessage',
        this.message.ADD_PRODUCT_SUCCESS,
      )
      window.location.reload()
    }
  }

  static async editProduct(newProduct) {
    const response = await this.productService.addProduct(newProduct)
    console.log(response)
  }
}

export default Foods
