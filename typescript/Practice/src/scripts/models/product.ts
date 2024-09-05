import ProductService from '../services/product'
import Notification from '../utilities/notification'
import Loader from '../utilities/loader'
import SortObjectsByPropertyAZ from '../utilities/sort'

class Product {
  private static instance: Product
  private products: TProduct[] = []
  loaderInstance: Loader
  productService: ProductService
  notificationInstance: Notification

  private constructor() {
    this.loaderInstance = Loader.getInstance()
    this.productService = ProductService.getInstance()
    this.notificationInstance = Notification.getInstance()
  }

  public static getInstance(): Product {
    if (!this.instance) {
      this.instance = new this()
    }
    return this.instance
  }

  getter(): TProduct[] {
    return this.products
  }

  setter(products: TProduct[]): void {
    this.products = products
  }

  /**
   * Sorts the products based on the specified criteria.
   */
  sortProducts(
    typeOfSort: 'AToZ' | 'ZToA',
    products: TProduct[],
    property: keyof TProduct = 'name',
  ): TProduct[] {
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
  async fetchAndFilterProducts(
    options: Partial<TFilterOptions<TProduct>>,
  ): Promise<TProduct[]> {
    const {
      typeOfSort = '',
      property = 'name',
      value = '',
      limit = '9',
    } = options
    let response: TApiResponse<TProduct[]>

    // Fetch products based on filter criteria
    if (property && value) {
      response = await this.productService.filterProduct(property, value, limit)
    } else {
      response = await this.productService.getProduct(limit)
    }

    if (response.status === 'success') {
      this.products = typeOfSort
        ? this.sortProducts(typeOfSort, response.data ?? [], property)
        : (response.data ?? [])
    } else {
      this.products = []
      this.notificationInstance.renderNotification(response)
    }

    return this.products
  }

  /**
   * Fetches additional products based on filtering options.
   */
  async getMoreProduct({
    property = 'name',
    value = '',
    limit = '9',
  }: TFilterOptions<TProduct>): Promise<TProduct[]> {
    let data: TProduct[] = []
    const limitNumber = Number.parseInt(limit)
    const response: TApiResponse<TProduct[]> =
      await this.productService.filterProduct(property, value, limit)

    if (response.status === 'success') {
      const responseData = response.data ?? [] // Default to empty array if undefined

      // Check if there are enough products to fetch
      if (limitNumber - responseData.length > 10) {
        this.notificationInstance.renderNotification({
          status: 'error',
          message: 'No more products available',
        })
        return data
      }

      this.products = responseData
      data = this.products.slice(limitNumber - 10, this.products.length) // TODO: Return only the new products
    }

    this.notificationInstance.renderNotification(response)
    return data
  }

  /**
   * Submits a new product or edits an existing product.
   */
  async submitProduct(newProduct: TProduct): Promise<TApiResponse<TProduct>> {
    const data = { ...newProduct }
    data.price = parseFloat(data.price).toFixed(2).toString()
    let response
    if (newProduct.id) {
      // Edit an existing product
      response = await this.productService.editProduct(data)
      if (response.status === 'success') {
        // Update products in the products array
        const productIndex = this.products.findIndex(
          (product) => product.id === data.id,
        )
        if (productIndex !== -1) {
          this.products[productIndex] = data
        }
      }
      this.notificationInstance.renderNotification(response)
      return response
    }
    // Add a new product
    response = await this.productService.addProduct(data)
    if (response.status === 'success' && response.data) {
      // Add the new product to the beginning of the products array
      this.products.unshift(response.data)
    }

    this.notificationInstance.renderNotification(response)
    return response
  }

  /**
   * Deletes a product by its ID and removes it from the product list.
   */
  async deleteProduct(id: string): Promise<TApiResponse<TProduct>> {
    const response = await this.productService.deleteProduct(id)
    if (response.status === 'success') {
      // Remove product with the given id from the products array
      this.products = this.products.filter((product) => product.id !== id)
    }
    this.notificationInstance.renderNotification(response)
    return response
  }
}

export default Product
