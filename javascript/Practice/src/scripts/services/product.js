import Api from '../constants/api'

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
      return response.json()
    } catch (error) {
      console.error('Error fetching product:', error)
    }
    return null
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
      return response.json()
    } catch (error) {
      console.error('Error fetching product:', error)
    }
    return null
  }

  async getProductById(id) {
    try {
      const response = await fetch(`${this.url}/${id}`)
      return response.json()
    } catch (error) {
      console.error('Error fetching product:', error)
    }
    return null
  }

  async addProduct(newProduct) {
    try {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newProduct),
      })
      return response.json()
    } catch (error) {
      console.log(error)
    }
    return null
  }

  async editProduct(newProduct) {
    try {
      const response = await fetch(`${this.url}/${newProduct.id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newProduct),
      })
      return response.json()
    } catch (error) {
      console.log(error)
    }
    return null
  }

  async deleteProduct(id) {
    try {
      const response = await fetch(`${this.url}/${id}`, {
        method: 'DELETE',
      })
      return response.json()
    } catch (error) {
      console.log(error)
    }
    return null
  }
}

export default ProductService
