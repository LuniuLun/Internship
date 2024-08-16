/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
import ProductService from '../services/product'
import ProductTemplate from '../template/product'
import Sort from '../utilities/sort'
import Notification from '../utilities/notification'
import Loader from '../utilities/loader'
import BaseInstance from '../utilities/baseInstance'

class Product extends BaseInstance {
  constructor() {
    super()
    this.loaderInstance = Loader.getInstance()
    this.productTemplate = ProductTemplate.getInstance()
    this.productService = ProductService.getInstance()
    this.notificationInstance = Notification.getInstance()
    this.products = []
  }

  /**
   * Returns the current state of products and limit.
   * @returns {Object} - The current products array and limit value.
   */
  getter() {
    return this.products
  }

  /**
   * Updates the current state with the provided products and limit.
   * @param {Object} param0 - The products array and limit value to set.
   */
  setter(products) {
    this.products = products
  }

  /**
   * Sorts the products based on the provided sorting type and property.
   * @param {string} typeOfSort - The type of sort (e.g., 'AToZ', 'ZToA').
   * @param {Array} products - The array of products to sort.
   * @param {string} property - The property to sort by (default is 'name').
   * @returns {Array} - The sorted array of products.
   */
  sortProducts(typeOfSort, products, property = 'name') {
    if (typeOfSort === 'AToZ') {
      return Sort.sortObjectsByPropertyAZ(products, property)
    }
    if (typeOfSort === 'ZToA') {
      return Sort.sortObjectsByPropertyAZ(products, property).reverse()
    }
    return products
  }

  /**
   * Fetches and filters products based on the provided criteria.
   * If no filtering criteria are provided, it fetches all products.
   * @param {Object} options - The filtering options including sort type, property, value, and limit.
   * @param {string} options.typeOfSort - The type of sorting (AToZ or ZToA).
   * @param {string} options.property - The property to filter by.
   * @param {string} options.value - The value of the property to filter by.
   * @param {number} options.limit - The maximum number of products to fetch.
   * @returns {Array} - The filtered or fetched array of products.
   */
  async fetchAndFilterProducts({
    typeOfSort = '',
    property = '',
    value = '',
    limit = 9,
  } = {}) {
    let response

    if (property && value) {
      response = await this.productService.filterProduct(property, value, limit)
    } else {
      response = await this.productService.getProduct(limit)
    }

    if (response.status === 'success') {
      this.products = typeOfSort
        ? this.sortProducts(typeOfSort, response.data)
        : response.data
    } else {
      this.products = []
      this.notificationInstance.renderNotification(response)
    }

    return this.products
  }

  /**
   * Filters products based on sorting type, property, value, and limit.
   * Returns the filtered and sorted products.
   * @param {Object} options - The filtering options.
   * @param {string} options.property - The property to filter by.
   * @param {string} options.value - The value of the property to filter by.
   * @param {number} options.limit - The number of products to fetch.
   * @returns {Array} - The filtered and sorted products.
   */
  async getMoreProduct({ property = 'name', value = '', limit = 9 }) {
    const response = await this.productService.filterProduct(
      property,
      value,
      limit,
    )
    let data = []

    if (limit - response.data.length > 10) {
      this.notificationInstance.renderNotification({
        status: 'error',
        message: 'No more products available',
      })
      return data
    }
    if (response.status === 'success') {
      this.products = response.data
      data = this.products.slice(limit - 10, this.products.length) // Return only the new products
    }
    this.notificationInstance.renderNotification(response)
    return data
  }

  /**
   * Submits a new product or edits an existing product.
   * @param {Object} newProduct - The product data to be submitted.
   * @returns {Promise<Object>} A promise that resolves to the result of the operation.
   */
  async submitProduct(newProduct) {
    const data = { ...newProduct }
    data.price = parseFloat(parseFloat(data.price).toFixed(2))
    let response
    if (newProduct.id) {
      // Edit an existing product
      response = await this.productService.editProduct(data)
      if (response.status === 'success') {
        // Update products in the products array
        const productIndex = this.products.findIndex(
          (product) => product.id === data.id,
        )
        if (productIndex !== -1) {
          this.products[productIndex] = data
        }
      }
      this.notificationInstance.renderNotification(response)
      return response
    }
    // Add a new product
    response = await this.productService.addProduct(data)
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
