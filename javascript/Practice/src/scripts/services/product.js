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

  async getProduct() {
    try {
      const response = await fetch(this.url)
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
