class Api {
  constructor() {
    this.BASE_URL = 'https://669e22209a1bda368005842c.mockapi.io/api/v1/'
    this.PRODUCTS_ENDPOINT = 'products'
    this.instance = this
  }

  static getInstance() {
    if (!Api.instance) {
      Api.instance = new Api()
    }
    return Api.instance
  }
}

export default Api
