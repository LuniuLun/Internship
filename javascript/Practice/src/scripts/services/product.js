import Message from '../constants/message'
import Notification from '../utilities/notification'

class ProductService {
  constructor() {
    this.url = `${process.env.PARCEL_REACT_APP_BASE_URL}${process.env.PARCEL_REACT_APP_PRODUCTS_ENDPOINT}`
    this.notificationInstance = Notification.getInstance()
    this.instance = this
  }

  /**
   * Singleton pattern to ensure only one instance of ProductService exists.
   * @returns {ProductService} The instance of ProductService.
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new ProductService()
    }
    return this.instance
  }

  /**
   * Fetches a list of products with a specified limit.
   * @param {number} limit - The number of products to fetch.
   * @returns {Promise<{ status: string, data?: Object[], message?: string }>} A promise that resolves to the list of products or an error object.
   */
  async getProduct(limit = 9) {
    try {
      const calledUrl = new URL(this.url)
      calledUrl.searchParams.append('page', 1)
      calledUrl.searchParams.append('limit', limit)
      const response = await fetch(calledUrl)

      if (!response.ok) {
        return {
          status: 'error',
          message: Message.NOT_FOUND,
        }
      }

      const data = await response.json()
      return {
        status: 'success',
        data,
      }
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      }
    }
  }

  /**
   * Filters products based on a specified property and value with a limit.
   * @param {string} property - The property to filter by.
   * @param {string} value - The value of the property to filter by.
   * @param {number} limit - The number of products to fetch.
   * @returns {Promise<{ status: string, data?: Object[], message?: string }>} A promise that resolves to the filtered list of products or an error object.
   */
  async filterProduct(property = '', value = '', limit = 9) {
    try {
      const calledUrl = new URL(this.url)
      calledUrl.searchParams.append('page', 1)
      calledUrl.searchParams.append('limit', limit)

      if (property !== '' && value !== '') {
        calledUrl.searchParams.append(property, value)
      }

      const response = await fetch(calledUrl)

      if (!response.ok) {
        return {
          status: 'error',
          message: Message.NOT_FOUND,
        }
      }
      const data = await response.json()
      return {
        status: 'success',
        data,
      }
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      }
    }
  }

  /**
   * Fetches a product by its ID.
   * @param {string} id - The ID of the product to fetch.
   * @returns {Promise<{ status: string, data?: Object, message?: string }>} A promise that resolves to the product data or an error object.
   */
  async getProductById(id) {
    try {
      const response = await fetch(`${this.url}/${id}`)

      if (!response.ok) {
        return {
          status: 'error',
          message: Message.NOT_FOUND,
        }
      }

      const data = await response.json()
      return {
        status: 'success',
        data,
      }
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      }
    }
  }

  /**
   * Adds a new product.
   * @param {Object} newProduct - The new product data to be added.
   * @returns {Promise<{ status: string, data?: Object, message?: string }>} A promise that resolves to the added product data or an error object.
   */
  async addProduct(newProduct) {
    try {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newProduct),
      })

      if (!response.ok) {
        return {
          status: 'error',
          message: Message.ADD_PRODUCT_FAILED,
        }
      }

      const data = await response.json()
      return {
        status: 'success',
        message: Message.ADD_PRODUCT_SUCCESS,
        data,
      }
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      }
    }
  }

  /**
   * Edits an existing product.
   * @param {Object} newProduct - The updated product data.
   * @returns {Promise<{ status: string, data?: Object, message?: string }>} A promise that resolves to the updated product data or an error object.
   */
  async editProduct(newProduct) {
    try {
      const response = await fetch(`${this.url}/${newProduct.id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newProduct),
      })

      if (!response.ok) {
        return {
          status: 'error',
          message: Message.EDIT_PRODUCT_FAILED,
        }
      }

      const data = await response.json()
      return {
        status: 'success',
        message: Message.EDIT_PRODUCT_SUCCESS,
        data,
      }
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      }
    }
  }

  /**
   * Deletes a product by its ID.
   * @param {string} id - The ID of the product to delete.
   * @returns {Promise<{ status: string, data?: Object, message?: string }>} A promise that resolves to the deleted product data or an error object.
   */
  async deleteProduct(id) {
    try {
      const response = await fetch(`${this.url}/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        return {
          status: 'error',
          message: Message.DELETE_PRODUCT_FAILED,
        }
      }

      const data = await response.json()
      return {
        status: 'success',
        message: Message.DELETE_PRODUCT_SUCCESS,
        data,
      }
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      }
    }
  }
}

export default ProductService
