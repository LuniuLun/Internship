/* eslint-disable consistent-return */
import ProductService from '../services/product'
import ProductTemplate from '../template/product'
import Sort from '../utilities/sort'
import Notification from '../utilities/notification'
import Loader from '../utilities/loader'

class Product {
  constructor() {
    this.instance = this
    this.loaderInstance = Loader.getInstance()
    this.productTemplate = ProductTemplate.getInstance()
    this.productService = ProductService.getInstance()
    this.notificationInstance = Notification.getInstance()
    this.products = []
    this.limit = 9
  }

  /**
   * Singleton pattern to ensure only one instance of Product exists.
   * @returns {Product} The single instance of Product.
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new Product()
    }
    return this.instance
  }

  getter() {
    return { products: this.products, limit: this.limit }
  }

  setter({ products, limit = 9 }) {
    this.products = products
    this.limit = limit
  }

  /**
   * Fetches a list of products with a specified limit and reverses the order.
   * @returns {Promise<Object[]>} A promise that resolves to the list of products.
   */
  async getProduct() {
    // Fetch products only if the products array is empty
    if (!this.products.length) {
      const response = await this.productService.getProduct(this.limit)
      if (response.status === 'success') {
        this.products = response.data
        if (this.products.length > 0) {
          this.products = this.products.reverse()
        }
      } else {
        this.notificationInstance.renderNotification(response)
      }
    }
    return this.products
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
    this.loaderInstance.showLoader()
    this.limit = limit
    const renderProductEle = document.querySelector('.js-get-products')
    const showMoreProductBtn = document.querySelector('.js-show-more-product')
    renderProductEle.innerHTML = ''

    // Fetch filtered products from the product service
    const response = await this.productService.filterProduct(
      property,
      value,
      limit,
    )
    if (response.status === 'success' && response.data.length > 0) {
      let html = ProductTemplate.renderAdditionCard()

      this.products = response.data.reverse() // Reverse the order of products
      if (typeOfSort === 'AToZ') {
        this.products = Sort.sortObjectsByPropertyAZ(this.products, 'name')
      }
      if (typeOfSort === 'ZToA') {
        this.products = Sort.sortObjectsByPropertyAZ(
          this.products,
          'name',
        ).reverse()
      }

      // Render each product card
      this.products.forEach((item) => {
        html += ProductTemplate.renderProductCard(item)
      })
      renderProductEle.innerHTML += html
      showMoreProductBtn.style.display = 'block'
    } else {
      showMoreProductBtn.style.display = 'none'
    }
    this.loaderInstance.hideLoader()
    this.notificationInstance.renderNotification(response)
  }

  /**
   * Submits a new product or edits an existing product.
   * @param {Object} newProduct - The product data to be submitted.
   * @returns {Promise<Object>} A promise that resolves to the result of the operation.
   */
  async submitProduct(newProduct) {
    let response
    if (newProduct.id) {
      // Edit an existing product
      response = await this.productService.editProduct(newProduct)
      if (response.status === 'success') {
        // Update products in the products array
        const productIndex = this.products.findIndex(
          (product) => product.id === newProduct.id,
        )
        if (productIndex !== -1) {
          this.products[productIndex] = newProduct
        }
      }
      this.notificationInstance.renderNotification(response)
      return response
    }
    // Add a new product
    response = await this.productService.addProduct(newProduct)
    if (response.status === 'success') {
      // Add the new product to the beginning of the products array
      this.products.unshift(response.data)
    }

    this.notificationInstance.renderNotification(response)
    return response
  }

  /**
   * Deletes a product by its ID and removes it from the product list.
   * @param {string} id - The ID of the product to delete.
   * @returns {Promise<Object>} A promise that resolves to the result of the operation.
   */
  async deleteProduct(id) {
    const response = await this.productService.deleteProduct(id)
    if (response.status === 'success') {
      // Remove product with the given id from the products array
      this.products = this.products.filter((product) => product.id !== id)
    }
    this.notificationInstance.renderNotification(response)
    return response
  }
}

export default Product
