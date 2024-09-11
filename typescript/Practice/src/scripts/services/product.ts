import MESSAGE from '../constants/message'

class ProductService {
  private static instance: ProductService
  private url: string

  private constructor() {
    this.url = `${process.env.PARCEL_APP_BASE_URL}${process.env.PARCEL_APP_PRODUCTS_ENDPOINT}`
  }

  public static getInstance(): ProductService {
    if (!this.instance) {
      this.instance = new this()
    }
    return this.instance
  }

  async getProduct(limit: string = '9'): Promise<TApiResponse<TProduct[]>> {
    try {
      const calledUrl = new URL(this.url)
      calledUrl.searchParams.append('page', '1')
      calledUrl.searchParams.append('limit', limit)
      const response = await fetch(calledUrl.toString())

      if (!response.ok) {
        return {
          status: 'error',
          message: MESSAGE.NOT_FOUND,
        }
      }

      const data = await response.json()
      return {
        status: 'success',
        message: MESSAGE.GET_PRODUCT_SUCCESS,
        data,
      }
    } catch (error: unknown) {
      return {
        status: 'error',
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
      }
    }
  }

  async filterProduct(
    property = '',
    value = '',
    limit = '9',
  ): Promise<TApiResponse<TProduct[]>> {
    try {
      const calledUrl = new URL(this.url)
      calledUrl.searchParams.append('page', '1')
      calledUrl.searchParams.append('limit', limit)

      if (property !== '' && value !== '') {
        calledUrl.searchParams.append(property, value)
      }

      const response = await fetch(calledUrl.toString())

      if (!response.ok) {
        return {
          status: 'error',
          message: MESSAGE.NOT_FOUND,
        }
      }
      const data = await response.json()

      return {
        status: 'success',
        message: MESSAGE.FILTER_PRODUCT_FAILED,
        data,
      }
    } catch (error: unknown) {
      return {
        status: 'error',
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
      }
    }
  }

  async addProduct(newProduct: TProduct): Promise<TApiResponse<TProduct>> {
    try {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      })

      if (!response.ok) {
        return {
          status: 'error',
          message: MESSAGE.ADD_PRODUCT_FAILED,
        }
      }

      const data = await response.json()
      return {
        status: 'success',
        message: MESSAGE.ADD_PRODUCT_SUCCESS,
        data,
      }
    } catch (error: unknown) {
      return {
        status: 'error',
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
      }
    }
  }

  async editProduct(newProduct: TProduct): Promise<TApiResponse<TProduct>> {
    try {
      if (!newProduct.id) {
        throw new Error('Product ID is required for editing.')
      }

      const response = await fetch(`${this.url}/${newProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      })

      if (!response.ok) {
        return {
          status: 'error',
          message: MESSAGE.EDIT_PRODUCT_FAILED,
        }
      }

      const data = await response.json()
      return {
        status: 'success',
        message: MESSAGE.EDIT_PRODUCT_SUCCESS,
        data,
      }
    } catch (error: unknown) {
      return {
        status: 'error',
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
      }
    }
  }

  async deleteProduct(id: string): Promise<TApiResponse<TProduct>> {
    try {
      const response = await fetch(`${this.url}/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        return {
          status: 'error',
          message: MESSAGE.DELETE_PRODUCT_FAILED,
        }
      }

      const data = await response.json()
      return {
        status: 'success',
        message: MESSAGE.DELETE_PRODUCT_SUCCESS,
        data,
      }
    } catch (error: unknown) {
      return {
        status: 'error',
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
      }
    }
  }
}

export default ProductService
