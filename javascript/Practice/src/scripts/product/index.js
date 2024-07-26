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

  /**
   * Singleton pattern to ensure only one instance of Product exists.
   * @returns {Product} The instance of Product.
   */
  static getInstance() {
    if (!Product.instance) {
      Product.instance = new Product()
    }
    return Product.instance
  }

  /**
   * Fetches a list of products with a specified limit and reverses the order.
   * @param {number} limit - The number of products to fetch.
   * @returns {Promise<Object[]>} A promise that resolves to the list of products.
   */
  async getProduct(limit = 9) {
    let products = await this.productService.getProduct(limit)
    if (Array.isArray(products) && products.length > 0) {
      products = products.reverse()
    }
    return products
  }

  /**
   * Filters products based on sorting type, property, value, and limit.
   * Updates the product list in the DOM.
   * @param {Object} options - The filtering options.
   * @param {string} options.typeOfSort - The type of sorting (AToZ or ZToA).
   * @param {string} options.property - The property to filter by.
   * @param {string} options.value - The value of the property to filter by.
   * @param {number} options.limit - The number of products to fetch.
   */
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

  /**
   * Fetches a product by its ID.
   * @param {string} id - The ID of the product to fetch.
   * @returns {Promise<Object>} A promise that resolves to the product data.
   */
  async getProductById(id) {
    const currentProduct = await this.productService.getProductById(id)
    return currentProduct
  }

  /**
   * Submits a new product or edits an existing product.
   * @param {Object} newProduct - The product data to be submitted.
   */
  async submitProduct(newProduct) {
    if (newProduct.id) {
      await this.editProduct(newProduct)
      return
    }
    await this.addProduct(newProduct)
  }

  /**
   * Adds a new product and reloads the page if successful.
   * @param {Object} newProduct - The new product data to be added.
   */
  async addProduct(newProduct) {
    const response = await this.productService.addProduct(newProduct)
    if (response) {
      localStorage.setItem('Message', Message.getInstance().ADD_PRODUCT_SUCCESS)
      window.location.reload()
    }
  }

  /**
   * Edits an existing product and reloads the page if successful.
   * @param {Object} newProduct - The updated product data.
   */
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

  /**
   * Deletes a product by its ID and reloads the page if successful.
   * @param {string} id - The ID of the product to delete.
   */
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
