import ProductService from '../services/product'
import ProductTemplate from '../template/product'
import Message from '../constants/message'
import Sort from '../utilities/sort'

class Product {
  constructor() {
    this.instance = this
    this.productTemplate = ProductTemplate.getInstance()
    this.productService = ProductService.getInstance()
  }

  static getInstance() {
    if (!Product.instance) {
      Product.instance = new Product()
    }
    return Product.instance
  }

  async getProduct(limit = 9) {
    let products = await this.productService.getProduct(limit)
    if (Array.isArray(products) && products.length > 0) {
      products = products.reverse()
    }
    return products
  }

  async filterProduct({
    typeOfSort = '',
    property = '',
    value = '',
    limit = 9,
  }) {
    const renderProductEle = document.querySelector('.js-get-products')
    renderProductEle.innerHTML = ''
    let html = ProductTemplate.renderAdditionCard()

    let products = await this.productService.filterProduct(
      property,
      value,
      limit,
    )
    if (Array.isArray(products) && products.length > 0) {
      products = products.reverse()
      if (typeOfSort === 'AToZ') {
        products = Sort.sortObjectsByPropertyAZ(products, 'name')
      }
      if (typeOfSort === 'ZToA') {
        products = Sort.sortObjectsByPropertyAZ(products, 'name').reverse()
      }

      products.forEach((item) => {
        html += ProductTemplate.renderProductCard(item)
      })
    }
    renderProductEle.innerHTML += html
  }

  async getProductById(id) {
    const currentProduct = await this.productService.getProductById(id)
    return currentProduct
  }

  async submitProduct(newProduct) {
    if (newProduct.id) {
      await this.editProduct(newProduct)
      return
    }
    await this.addProduct(newProduct)
  }

  async addProduct(newProduct) {
    const response = await this.productService.addProduct(newProduct)
    if (response) {
      localStorage.setItem('Message', Message.getInstance().ADD_PRODUCT_SUCCESS)
      window.location.reload()
    }
  }

  async editProduct(newProduct) {
    const response = await this.productService.editProduct(newProduct)
    if (response) {
      localStorage.setItem(
        'Message',
        Message.getInstance().EDIT_PRODUCT_SUCCESS,
      )
      window.location.reload()
    }
  }

  async deleteProduct(id) {
    const response = await this.productService.deleteProduct(id)
    if (response) {
      localStorage.setItem(
        'Message',
        Message.getInstance().DELETE_PRODUCT_SUCCESS,
      )
      window.location.reload()
    }
  }
}

export default Product
