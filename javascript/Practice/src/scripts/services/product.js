import Api from '../constants/api'

class ProductService {
  constructor() {
    this.api = Api.getInstance()
    this.instance = this
  }

  static getInstance() {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService()
    }
    return ProductService.instance
  }

  async getProduct() {
    const url = `${this.api.BASE_URL}${this.api.PRODUCTS_ENDPOINT}`
    try {
      const response = await fetch(url)
      return response.json()
    } catch (error) {
      console.error('Error fetching product:', error)
    }
    return null
  }
}

export default ProductService
