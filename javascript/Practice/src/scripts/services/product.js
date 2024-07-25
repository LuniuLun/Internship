import Api from '../constants/api'
import Message from '../constants/message'
import Notification from '../objects/notification'

class ProductService {
  constructor() {
    this.api = Api.getInstance()
    this.url = `${this.api.BASE_URL}${this.api.PRODUCTS_ENDPOINT}`
    this.instance = this
  }

  static getInstance() {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService()
    }
    return ProductService.instance
  }

  async getProduct(limit = 9) {
    try {
      const calledUrl = new URL(this.url)
      calledUrl.searchParams.append('page', 1)
      calledUrl.searchParams.append('limit', limit)
      const response = await fetch(calledUrl)
      if (!response.ok) {
        Notification.renderErrorNotification(
          Message.getInstance().GET_PRODUCT_FAILED,
        )
        return null
      }
      return response.json()
    } catch (error) {
      return null
    }
  }

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
        Notification.renderErrorNotification(
          Message.getInstance().GET_PRODUCT_FAILED,
        )
        return null
      }
      return response.json()
    } catch (error) {
      return null
    }
  }

  async getProductById(id) {
    try {
      const response = await fetch(`${this.url}/${id}`)
      if (!response.ok) {
        Notification.renderErrorNotification(
          Message.getInstance().GET_PRODUCT_FAILED,
        )
        return null
      }
      return response.json()
    } catch (error) {
      return null
    }
  }

  async addProduct(newProduct) {
    try {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newProduct),
      })
      if (!response.ok) {
        Notification.renderErrorNotification(
          Message.getInstance().ADD_PRODUCT_FAILED,
        )
        return null
      }
      return response.json()
    } catch (error) {
      return null
    }
  }

  async editProduct(newProduct) {
    try {
      const response = await fetch(`${this.url}/${newProduct.id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newProduct),
      })
      if (!response.ok) {
        Notification.renderErrorNotification(
          Message.getInstance().EDIT_PRODUCT_FAILED,
        )
        return null
      }
      return response.json()
    } catch (error) {
      return null
    }
  }

  async deleteProduct(id) {
    try {
      const response = await fetch(`${this.url}/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        Notification.renderErrorNotification(
          Message.getInstance().DELETE_PRODUCT_FAILED,
        )
        return null
      }
      return response.json()
    } catch (error) {
      return null
    }
  }
}

export default ProductService
