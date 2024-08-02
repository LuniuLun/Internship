/* eslint-disable class-methods-use-this */
import ProductTemplate from '../template/product'
import Product from '../product'
import RuleFilter from '../utilities/filterRule'
import Popup from './popup'
import Loader from '../utilities/loader'
import eventBus from '../utilities/eventBus'

class HomePage {
  constructor() {
    this.instance = this
    this.popupInstance = Popup.getInstance()
    this.loaderInstance = Loader.getInstance()
    this.productInstance = Product.getInstance()
  }

  /**
   * Singleton pattern to ensure only one instance of HomePage exists.
   * @returns {HomePage} The instance of HomePage.
   */
  static getInstance() {
    if (!HomePage.instance) {
      HomePage.instance = new HomePage()
    }
    return HomePage.instance
  }

  /**
   * Initializes the HomePage by rendering products, setting up event listeners, and handling functionalities.
   */
  async create() {
    this.loaderInstance.showLoader()
    await this.renderProduct()
    this.showPopup()
    this.dropdownToggle()
    this.filterProduct()
    this.getMoreProduct()
    eventBus.on('reloadProduct', () => {
      this.renderProduct()
    })
    this.loaderInstance.hideLoader()
  }

  /**
   * Toggles the visibility of the dropdown menu for sorting options.
   */
  dropdownToggle() {
    const toggleBtn = document.querySelector('.js-btn-toggle')
    const sortOption = document.querySelector('.js-sort-option')

    toggleBtn.addEventListener('click', () => {
      sortOption.classList.toggle('show')
    })
  }

  /**
   * Renders the list of products on the home page.
   * @param {number} [limit=9] - The number of products to render.
   */
  async renderProduct(limit = 9) {
    const products = await this.productInstance.getProduct(limit)
    const renderProductEle = document.querySelector('.js-get-products')
    renderProductEle.innerHTML = ''
    let html = ProductTemplate.renderAdditionCard()

    if (Array.isArray(products) && products.length > 0) {
      products.forEach((item) => {
        html += ProductTemplate.renderProductCard(item)
      })
    }

    renderProductEle.innerHTML += html
  }

  /**
   * Filters the products based on user input and sorting options.
   */
  filterProduct() {
    const inputEle = document.querySelector('.js-filter-input')
    const sortOptionEle = document.querySelectorAll('.sort-option__item')
    const sortOption = document.querySelector('.js-sort-option')
    const productInstance = Product.getInstance()
    const ruleFilter = RuleFilter.getInstance()

    inputEle.addEventListener('change', async (event) => {
      ruleFilter.setFilter({ value: event.target.value })
      await productInstance.filterProduct(ruleFilter)
    })

    sortOptionEle.forEach((ele) => {
      ele.addEventListener('click', async (event) => {
        sortOption.classList.remove('show')
        const typeOfSort = event.target.getAttribute('data-value')
        ruleFilter.setFilter({ typeOfSort, value: inputEle.value })
        await productInstance.filterProduct(ruleFilter)
      })
    })
  }

  /**
   * Sets up event listeners for showing popup forms when user interacts with product elements.
   */
  showPopup() {
    const getFormEle = document.querySelector('.js-get-popup')

    getFormEle.addEventListener('click', (event) => {
      const targetElement = event.target

      // TODO: Handle when the user presses the product edit button
      if (targetElement.closest('.js-edit-product')) {
        const productElement = targetElement.closest('.product')
        const id = productElement.getAttribute('data-id')
        const name = productElement
          .querySelector('.js-get-name')
          .textContent.trim()
        const imageURL = productElement
          .querySelector('.js-get-imageURL')
          .src.trim()
        const price = productElement
          .querySelector('.js-get-price')
          .textContent.trim()
        const quantity = productElement
          .querySelector('.js-get-quantity')
          .textContent.trim()
        const popupInstance = new Popup({
          id,
          name,
          imageURL,
          price,
          quantity,
        })
        popupInstance.showForm()
        return
      }

      // TODO: Handle when the user presses the product warning button
      if (targetElement.closest('.js-get-warning')) {
        const id = targetElement.closest('.product').getAttribute('data-id')
        const rect = event.target.getBoundingClientRect()
        const popupTop = rect.top + window.scrollY
        this.popupInstance.showWarningForm(id, popupTop)
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
   */
  getMoreProduct() {
    const getMoreProductEle = document.querySelector('.js-show-more-product')
    const inputEle = document.querySelector('.js-filter-input')
    const productInstance = Product.getInstance()
    const ruleFilter = RuleFilter.getInstance()

    getMoreProductEle.addEventListener('click', async (event) => {
      const limit = event.target.getAttribute('data-value')
      event.target.setAttribute('data-value', Number(limit) + 10)
      ruleFilter.setFilter({
        value: inputEle.value,
        limit,
      })
      await productInstance.filterProduct(ruleFilter)
    })
  }
}

export default HomePage
