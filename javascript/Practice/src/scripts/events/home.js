/* eslint-disable class-methods-use-this */
import ProductTemplate from '../template/product'
import Product from '../product'
import RuleFilter from '../utilities/filterRule'
import Popup from './modal'
import Loader from '../utilities/loader'
import EventBus from '../utilities/eventBus'
import downArrowIcon from '../../assets/icons/down-arrow.svg'
import BaseInstance from '../utilities/baseInstance'

class HomePage extends BaseInstance {
  constructor() {
    super()
    this.popupInstance = Popup.getInstance()
    this.loaderInstance = Loader.getInstance()
    this.productInstance = Product.getInstance()
    this.eventBusInstance = EventBus.getInstance()
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
    this.eventBusInstance.on('reloadProduct', () => {
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
    const sortOptionItems = document.querySelectorAll('.sort-option__item')

    toggleBtn.addEventListener('click', () => {
      sortOption.classList.toggle('show')
    })

    sortOptionItems.forEach((item) => {
      item.addEventListener('click', () => {
        toggleBtn.innerHTML = `<img class="icon" src="${downArrowIcon}" alt="filter food">${item.textContent}`
      })
    })
  }

  /**
   * Renders the list of products on the home page.
   * @param {number} [limit=9] - The number of products to render.
   */
  async renderProduct(limit = 9) {
    const products = await this.productInstance.getProduct(limit)
    const showMoreProductBtn = document.querySelector('.js-show-more-product')
    const renderProductEle = document.querySelector('.js-get-products')
    renderProductEle.innerHTML = ''

    if (products.length) {
      let html = ProductTemplate.renderAdditionCard()
      products.forEach((item) => {
        html += ProductTemplate.renderProductCard(item)
      })
      renderProductEle.innerHTML += html
      showMoreProductBtn.style.display = 'flex'
      return
    }

    renderProductEle.innerHTML += `<p class='empty-state'>Not found results</p>`
    showMoreProductBtn.style.display = 'none'
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
        this.popupInstance.showForm(id)
        return
      }

      // TODO: Handle when the user presses the product warning button
      if (targetElement.closest('.js-get-warning')) {
        const id = targetElement.closest('.product').getAttribute('data-id')
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
