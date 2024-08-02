/* eslint-disable consistent-return */
import ProductService from '../services/product'
import ProductTemplate from '../template/product'
import Message from '../constants/message'
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
  async getProduct() {
    // Fetch products only if the products array is empty
    if (!this.products.length) {
      this.products = await this.productService.getProduct(this.limit)
      if (Array.isArray(this.products) && this.products.length > 0) {
        this.products = this.products.reverse() // Reverse the order of products
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
    renderProductEle.innerHTML = ''
    let html = ProductTemplate.renderAdditionCard()

    // Fetch filtered products from the product service
    this.products = await this.productService.filterProduct(
      property,
      value,
      limit,
    )
    if (Array.isArray(this.products) && this.products.length > 0) {
      this.products = this.products.reverse() // Reverse the order of products
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
    }
    renderProductEle.innerHTML += html
    this.loaderInstance.hideLoader()
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
   * @returns {Promise<Object>} A promise that resolves to the result of the operation.
   */
  async submitProduct(newProduct) {
    let response
    if (newProduct.id) {
      // Edit an existing product
      response = await this.productService.editProduct(newProduct)
      if (response) {
        this.notificationInstance.renderNotification({
          status: 'ok',
          message: Message.getInstance().EDIT_PRODUCT_SUCCESS,
        })

        // Update products in the products array
        const productIndex = this.products.findIndex(
          (product) => product.id === newProduct.id,
        )
        if (productIndex !== -1) {
          this.products[productIndex] = newProduct
        }

        return { success: true, data: response }
      }
    }
    // Add a new product
    response = await this.productService.addProduct(newProduct)
    if (response) {
      this.notificationInstance.renderNotification({
        status: 'ok',
        message: Message.getInstance().ADD_PRODUCT_SUCCESS,
      })
      // Add the new product to the beginning of the products array
      this.products.unshift(response)

      return { success: true, data: response }
    }
    return { success: false, data: response }
  }

  /**
   * Deletes a product by its ID and removes it from the product list.
   * @param {string} id - The ID of the product to delete.
   * @returns {Promise<Object>} A promise that resolves to the result of the operation.
   */
  async deleteProduct(id) {
    const response = await this.productService.deleteProduct(id)
    if (response) {
      this.notificationInstance.renderNotification({
        status: 'ok',
        message: Message.getInstance().DELETE_PRODUCT_SUCCESS,
      })

      // Remove product with the given id from the products array
      this.products = this.products.filter((product) => product.id !== id)

      return { success: true, data: response }
    }
    return { success: false, data: response }
  }
}

export default Product
