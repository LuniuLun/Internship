import ProductTemplate from '../template/product'
import Product from '../models/product'
import Popup from './modal'
import Loader from '../utilities/loader'
import EventBus from '../utilities/eventBus'
import downArrowIcon from '../../assets/icons/down-arrow.svg'
import handleErrors from '../utilities/handleError'
import getValidElements from '../utilities/getValidElement'

class HomePage {
  private static instance: HomePage
  private loaderInstance: Loader
  private productInstance: Product
  private eventBusInstance: EventBus
  private filterEle: HTMLElement | null
  private inputEle: HTMLInputElement | null
  private showMoreProductBtn: HTMLElement | null
  private renderProductEle: HTMLElement | null
  private popupInstance: Popup

  private filterOptions: TFilterOptions<TProduct> = {}

  private constructor() {
    this.loaderInstance = Loader.getInstance()
    this.productInstance = Product.getInstance()
    this.eventBusInstance = EventBus.getInstance()
    this.filterEle = handleErrors(() =>
      getValidElements(document.querySelector('.js-filter')),
    )
    this.inputEle = handleErrors(() =>
      getValidElements(document.querySelector('.js-filter-input')),
    )
    this.showMoreProductBtn = handleErrors(() =>
      getValidElements(document.querySelector('.js-show-more-product')),
    )
    this.renderProductEle = handleErrors(() =>
      getValidElements(document.querySelector('.js-get-products')),
    )
    this.popupInstance = Popup.getInstance({})
  }

  public static getInstance(): HomePage {
    if (!this.instance) {
      this.instance = new this()
    }
    return this.instance
  }

  /**
   * Initializes the HomePage by rendering products, setting up event listeners, and handling functionalities.
   */
  async create() {
    this.loaderInstance.showLoader()
    await this.getProducts()
    this.setupEventListeners()
    this.loaderInstance.hideLoader()
  }

  /**
   * Sets up event listeners for dropdown, filter, popup, and more products.
   */
  private setupEventListeners() {
    this.setupDropdownToggle()
    this.setupFilterProduct()
    this.setupShowMoreProduct()
    this.setupPopup()
    this.eventBusInstance.on('reloadProduct', () => {
      this.renderProducts(this.productInstance.getter())
    })
  }

  /**
   * Toggles the visibility of the dropdown menu for sorting options.
   */
  private setupDropdownToggle() {
    let toggleBtn = handleErrors(() =>
      getValidElements(this.filterEle?.querySelector('.js-btn-toggle')),
    )
    let sortOption = handleErrors(() =>
      getValidElements(this.filterEle?.querySelector('.js-sort-option')),
    )
    let sortOptionItems = handleErrors(() =>
      getValidElements(this.filterEle?.querySelectorAll('.sort-option__item')),
    )
    if (!toggleBtn || !sortOptionItems || !sortOption) return
    toggleBtn = toggleBtn as HTMLElement
    sortOption = sortOption as HTMLElement
    sortOptionItems = sortOptionItems as NodeListOf<HTMLElement>

    toggleBtn.addEventListener('click', () => {
      sortOption.classList.toggle('show')
    })

    sortOptionItems.forEach((item) => {
      item.addEventListener('click', () => {
        toggleBtn.innerHTML = `<img class="icon" src="${downArrowIcon}" alt="filter">${item.textContent}`
      })
    })
  }

  /**
   * Renders the filtered products on the page.
   */
  private renderProducts(products: TProduct[]) {
    if (this.renderProductEle) {
      this.renderProductEle.innerHTML = ''

      if (products.length) {
        let html = ProductTemplate.renderAdditionCard()
        products.forEach((item) => {
          html += ProductTemplate.renderProductCard(item)
        })
        this.renderProductEle.innerHTML += html
        if (this.showMoreProductBtn) {
          this.showMoreProductBtn.style.display = 'flex'
        }
      } else {
        this.renderProductEle.innerHTML += `<p class='empty-state'>Not found results</p>`
        if (this.showMoreProductBtn) {
          this.showMoreProductBtn.style.display = 'none'
        }
      }
    }
  }

  /**
   * Fetches and renders products on the page.
   */
  private async getProducts() {
    const products = await this.productInstance.fetchAndFilterProducts(
      this.filterOptions,
    )
    this.renderProducts(products)
  }

  /**
   * Sets up event listeners for filtering products based on user input and sorting options.
   */
  private setupFilterProduct() {
    let sortOptionItems = handleErrors(() =>
      getValidElements(this.filterEle?.querySelectorAll('.sort-option__item')),
    )
    let sortOption = handleErrors(() =>
      getValidElements(this.filterEle?.querySelector('.js-sort-option')),
    )
    if (!sortOptionItems || !sortOption) return
    sortOptionItems = sortOptionItems as NodeListOf<HTMLElement>
    sortOption = sortOption as HTMLElement

    sortOptionItems?.forEach((item) => {
      item.addEventListener('click', async (event: Event) => {
        this.loaderInstance.showLoader()
        sortOption.classList.remove('show')
        const typeOfSort = (event.target as HTMLElement).getAttribute(
          'data-value',
        ) as 'AToZ' | 'ZToA' | ''
        this.filterOptions.typeOfSort = typeOfSort
        this.filterOptions.value = this.inputEle?.value || ''
        const products = await this.productInstance.fetchAndFilterProducts(
          this.filterOptions,
        )
        this.renderProducts(products)
        this.loaderInstance.hideLoader()
      })
    })

    if (!this.inputEle) return
    this.inputEle = this.inputEle as HTMLInputElement

    this.inputEle?.addEventListener('change', async (event) => {
      this.loaderInstance.showLoader()
      this.filterOptions.value = (event.target as HTMLInputElement).value
      const products = await this.productInstance.fetchAndFilterProducts(
        this.filterOptions,
      )
      this.renderProducts(products)
      this.loaderInstance.hideLoader()
    })
  }

  /**
   * Sets up event listeners for showing popup forms when user interacts with product elements.
   */
  private setupPopup() {
    const getFormEle = handleErrors(() =>
      getValidElements(document.querySelector('.js-get-popup')),
    )
    if (!getFormEle) return
    const formEle = getFormEle as HTMLElement

    formEle.addEventListener('click', (event: MouseEvent) => {
      const targetElement = event.target as HTMLElement

      // TODO: Handle when the user presses the product edit button
      if (targetElement.closest('.js-edit-product')) {
        let productElement = handleErrors(() =>
          getValidElements(targetElement.closest('.product')),
        )
        if (!productElement) return
        productElement = productElement as HTMLElement

        const id = productElement.getAttribute('data-id') || ''
        this.popupInstance.showForm(id)
        return
      }

      // TODO: Handle when the user presses the product warning button
      if (targetElement.closest('.js-get-warning')) {
        let productElement = handleErrors(() =>
          getValidElements(targetElement.closest('.product')),
        )
        if (!productElement) return
        productElement = productElement as HTMLElement

        const id = productElement.getAttribute('data-id') || ''
        this.popupInstance.showWarningForm(id)
        return
      }

      // TODO: Handle when the user presses the button to add a new product
      if (targetElement.closest('.js-add-product')) {
        this.popupInstance.showForm()
      }
    })
  }

  /**
   * Loads more products when the "show more" button is clicked.
   * Updates the DOM with the newly loaded products.
   */
  private setupShowMoreProduct() {
    this.showMoreProductBtn?.addEventListener('click', async (event) => {
      this.loaderInstance.showLoader()

      // Get the current limit from the data attribute and convert it to a number
      const target = event.target as HTMLElement
      const currentLimit = Number(target.getAttribute('data-limit')) || 9

      // Update the limit
      const newLimit = currentLimit + 10
      target.setAttribute('data-limit', newLimit.toString())

      // Set filter options and fetch more products
      this.filterOptions.limit = newLimit.toString()
      const newProducts = await this.productInstance.getMoreProduct(
        this.filterOptions,
      )

      if (newProducts.length) {
        let html = ''
        newProducts.forEach((product) => {
          html += ProductTemplate.renderProductCard(product)
        })
        if (this.renderProductEle) {
          this.renderProductEle.innerHTML += html
        }
        if (this.showMoreProductBtn) {
          this.showMoreProductBtn.style.display = 'block'
        }
      } else {
        if (this.showMoreProductBtn) {
          this.showMoreProductBtn.style.display = 'none'
        }
      }

      this.loaderInstance.hideLoader()
    })
  }
}

export default HomePage
