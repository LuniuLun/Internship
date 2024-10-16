import MESSAGE from '../constants/message'
import { IApiResponse } from '../types/apiResponse'
import { IProduct } from '../types/product'

const baseUrl = `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_ENDPOINT}`

export const getProduct = async (limit: string = '9'): Promise<IApiResponse<IProduct[]>> => {
  try {
    const calledUrl = new URL(baseUrl)
    calledUrl.searchParams.append('page', '1')
    calledUrl.searchParams.append('limit', limit)
    const response = await fetch(calledUrl.toString())

    if (!response.ok) {
      return {
        status: 'error',
        message: MESSAGE.NOT_FOUND
      }
    }

    const data = await response.json()

    return {
      status: 'success',
      message: MESSAGE.GET_PRODUCT_SUCCESS,
      data
    }
  } catch (error: unknown) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

export const filterProduct = async (property = '', value = '', limit = '9'): Promise<IApiResponse<IProduct[]>> => {
  try {
    const calledUrl = new URL(baseUrl)
    calledUrl.searchParams.append('page', '1')
    calledUrl.searchParams.append('limit', limit)

    if (property !== '' && value !== '') {
      calledUrl.searchParams.append(property, value)
    }

    const response = await fetch(calledUrl.toString())

    if (!response.ok) {
      return {
        status: 'error',
        message: MESSAGE.NOT_FOUND
      }
    }

    const data = await response.json()
    return {
      status: 'success',
      message: MESSAGE.FILTER_PRODUCT_FAILED,
      data
    }
  } catch (error: unknown) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

export const addProduct = async (newProduct: IProduct): Promise<IApiResponse<IProduct>> => {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    })

    if (!response.ok) {
      return {
        status: 'error',
        message: MESSAGE.ADD_PRODUCT_FAILED
      }
    }

    const data = await response.json()
    return {
      status: 'success',
      message: MESSAGE.ADD_PRODUCT_SUCCESS,
      data
    }
  } catch (error: unknown) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

export const editProduct = async (newProduct: IProduct): Promise<IApiResponse<IProduct>> => {
  try {
    if (!newProduct.id) {
      throw new Error('Product ID is required for editing.')
    }

    const response = await fetch(`${baseUrl}/${newProduct.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    })

    if (!response.ok) {
      return {
        status: 'error',
        message: MESSAGE.EDIT_PRODUCT_FAILED
      }
    }

    const data = await response.json()
    return {
      status: 'success',
      message: MESSAGE.EDIT_PRODUCT_SUCCESS,
      data
    }
  } catch (error: unknown) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

export const deleteProduct = async (id: string): Promise<IApiResponse<IProduct>> => {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      return {
        status: 'error',
        message: MESSAGE.DELETE_PRODUCT_FAILED
      }
    }

    const data = await response.json()
    return {
      status: 'success',
      message: MESSAGE.DELETE_PRODUCT_SUCCESS,
      data
    }
  } catch (error: unknown) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}
