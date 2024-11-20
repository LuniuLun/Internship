import { useCallback } from 'react'
import * as productService from '@services/product'
import { IApiResponse } from '@type/apiResponse'
import { TFilterOptions } from '@type/filterOption'
import { IProduct } from '@type/product'
import SortObjectsByPropertyAZ from '@utilities/sort'

interface UseProductReturn {
  fetchProducts: (options: Partial<TFilterOptions<IProduct>>) => Promise<IApiResponse<IProduct[]>>
  submitProduct: (product: IProduct) => Promise<IApiResponse<IProduct>>
  deleteProduct: (id: string) => Promise<IApiResponse<IProduct>>
}

export const useProduct = (): UseProductReturn => {
  const sortProducts = useCallback(
    (typeOfSort: 'AToZ' | 'ZToA', products: IProduct[], property: keyof IProduct = 'name') => {
      if (typeOfSort === 'AToZ') {
        return SortObjectsByPropertyAZ(products, property)
      }
      if (typeOfSort === 'ZToA') {
        return SortObjectsByPropertyAZ(products, property).reverse()
      }
      return products
    },
    []
  )

  const fetchProducts = useCallback(
    async (options: Partial<TFilterOptions<IProduct>> = {}) => {
      const { typeOfSort = '', property = 'name', value = '', limit = '9' } = options
      const response =
        property && value
          ? await productService.filterProduct(property, value, limit)
          : await productService.getProduct(limit)

      const sortedData = typeOfSort ? sortProducts(typeOfSort, response.data ?? [], property) : (response.data ?? [])

      return { ...response, data: sortedData }
    },
    [sortProducts]
  )

  const submitProduct = async (product: IProduct): Promise<IApiResponse<IProduct>> => {
    const response = product.id ? await productService.editProduct(product) : await productService.addProduct(product)
    return response
  }

  const deleteProduct = async (id: string): Promise<IApiResponse<IProduct>> => {
    const response = await productService.deleteProduct(id)
    return response
  }

  return {
    fetchProducts,
    submitProduct,
    deleteProduct
  }
}
