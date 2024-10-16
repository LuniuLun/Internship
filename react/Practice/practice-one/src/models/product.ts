import { filterProduct, getProduct } from '../service/product'
import { IApiResponse } from '../types/apiResponse'
import { TFilterOptions } from '../types/filterOption'
import { IProduct } from '../types/product'
import SortObjectsByPropertyAZ from '../utilities/sort'

/**
 * Sorts the products based on the specified criteria.
 */
export const sortProducts = (
  typeOfSort: 'AToZ' | 'ZToA',
  products: IProduct[],
  property: keyof IProduct = 'name'
): IProduct[] => {
  if (typeOfSort === 'AToZ') {
    return SortObjectsByPropertyAZ(products, property)
  }
  if (typeOfSort === 'ZToA') {
    return SortObjectsByPropertyAZ(products, property).reverse()
  }
  return products
}

/**
 * Fetches and filters products based on provided options.
 */
export const fetchProducts = async (
  options: Partial<TFilterOptions<IProduct>> = {}
): Promise<IApiResponse<IProduct[]>> => {
  const { typeOfSort = '', property = 'name', value = '', limit = '9' } = options
  let response: IApiResponse<IProduct[]>
  // Fetch products based on filter criteria
  if (property && value) {
    response = await filterProduct(property, value, limit)
  } else {
    response = await getProduct(limit)
  }

  if (response.status === 'success') {
    response.data = typeOfSort ? sortProducts(typeOfSort, response.data ?? [], property) : (response.data ?? [])
  } else {
    response.data = []
  }

  return response
}

// /**
//  * Fetches additional products based on filtering options.
//  */
// export const getMoreProduct = async ({
//   property = 'name',
//   value = '',
//   limit = '9'
// }: TFilterOptions<IProduct>): Promise<IProduct[]> => {
//   let data: IProduct[] = []
//   const limitNumber = Number.parseInt(limit)
//   const response: IApiResponse<IProduct[]> = await productService.filterProduct(property, value, limit)

//   if (response.status === 'success') {
//     const responseData = response.data ?? [] // Default to empty array if undefined

//     // Check if there are enough products to fetch
//     if (limitNumber - responseData.length > 10) {
//       notificationInstance.renderNotification({
//         status: 'error',
//         message: 'No more products available'
//       })
//       return data
//     }

//     products = responseData
//     data = products.slice(limitNumber - 10, products.length) // Return only the new products
//   }

//   notificationInstance.renderNotification(response)
//   return data
// }

// /**
//  * Submits a new product or edits an existing product.
//  */
// export const submitProduct = async (newProduct: IProduct): Promise<IApiResponse<IProduct>> => {
//   const data = { ...newProduct }
//   data.price = parseFloat(data.price).toFixed(2).toString()
//   let response
//   if (newProduct.id) {
//     // Edit an existing product
//     response = await productService.editProduct(data)
//     if (response.status === 'success') {
//       // Update products in the products array
//       const productIndex = products.findIndex((product) => product.id === data.id)
//       if (productIndex !== -1) {
//         products[productIndex] = data
//       }
//     }
//     notificationInstance.renderNotification(response)
//     return response
//   }
//   // Add a new product
//   response = await productService.addProduct(data)
//   if (response.status === 'success' && response.data) {
//     // Add the new product to the beginning of the products array
//     products.unshift(response.data)
//   }

//   notificationInstance.renderNotification(response)
//   return response
// }

// /**
//  * Deletes a product by its ID and removes it from the product list.
//  */
// export const deleteProduct = async (id: string): Promise<IApiResponse<IProduct>> => {
//   const response = await productService.deleteProduct(id)
//   if (response.status === 'success') {
//     // Remove product with the given id from the products array
//     products = products.filter((product) => product.id !== id)
//   }
//   notificationInstance.renderNotification(response)
//   return response
// }
