/* eslint-disable class-methods-use-this */
import RuleFilter from '../utilities/filterRule'
import Popup from './modal'
import Loader from '../utilities/loader'
import EventBus from '../utilities/eventBus'
import downArrowIcon from '../../assets/icons/down-arrow.svg'
import BaseInstance from '../utilities/baseInstance'
import Product from '../model/product'
import { renderAdditionCard, renderProductCard } from '../template/product'

class HomePage extends BaseInstance {
  constructor() {
    super()
    this.popupInstance = Popup.getInstance()
    this.loaderInstance = Loader.getInstance()
    this.productInstance = Product.getInstance()
    this.eventBusInstance = EventBus.getInstance()
    this.filterEle = document.querySelector('.js-filter')
    this.inputEle = document.querySelector('.js-filter-input')
    this.showMoreProductBtn = document.querySelector('.js-show-more-product')
    this.renderProductEle = document.querySelector('.js-get-products')
  }

  /**
   * Initializes the HomePage by rendering products, setting up event listeners, and handling functionalities.
   */
  async create() {
    this.loaderInstance.showLoader()
    await this.getProducts()
    this.showPopup()
    this.dropdownToggle()
    this.filterProduct()
    this.getMoreProduct()
    this.eventBusInstance.on('reloadProduct', () => {
      this.renderProducts(this.productInstance.getter())
    })
    this.loaderInstance.hideLoader()
  }

  /**
   * Toggles the visibility of the dropdown menu for sorting options.
   */
  dropdownToggle() {
    const toggleBtn = this.filterEle.querySelector('.js-btn-toggle')
    const sortOption = this.filterEle.querySelector('.js-sort-option')
    const sortOptionItems =
      this.filterEle.querySelectorAll('.sort-option__item')

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
   * renders the filtered products on the page.
   * @param {Array} products - The array of filtered products to render.
   */
  renderProducts(products) {
    this.renderProductEle.innerHTML = ''

    if (products.length) {
      let html = renderAdditionCard()
      products.forEach((item) => {
        html += renderProductCard(item)
      })
      this.renderProductEle.innerHTML += html
      this.showMoreProductBtn.style.display = 'flex'
    } else {
      this.renderProductEle.innerHTML += `<p class='empty-state'>Not found results</p>`
      this.showMoreProductBtn.style.display = 'none'
    }
  }

  /**
   * Fetches and renders products on the page.
   * @param {number} limit - The maximum number of products to render.
   */
  async getProducts(limit = 9) {
    const products = await this.productInstance.fetchAndFilterProducts(limit)
    this.renderProducts(products)
  }

  /**
   * Sets up event listeners for filtering products based on user input and sorting options.
   */
  filterProduct() {
    const sortOptionEle = this.filterEle.querySelectorAll('.sort-option__item')
    const sortOption = this.filterEle.querySelector('.js-sort-option')
    const ruleFilter = RuleFilter.getInstance()

    this.inputEle.addEventListener('change', async (event) => {
      this.loaderInstance.showLoader()
      ruleFilter.setFilter({ value: event.target.value })
      const products =
        await this.productInstance.fetchAndFilterProducts(ruleFilter)
      this.renderProducts(products)
      this.loaderInstance.hideLoader()
    })

    sortOptionEle.forEach((ele) => {
      ele.addEventListener('click', async (event) => {
        this.loaderInstance.showLoader()
        sortOption.classList.remove('show')
        const typeOfSort = event.target.getAttribute('data-value')
        ruleFilter.setFilter({ typeOfSort, value: this.inputEle.value })
        const products =
          await this.productInstance.fetchAndFilterProducts(ruleFilter)
        this.renderProducts(products)
        this.loaderInstance.hideLoader()
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
   * Updates the DOM with the newly loaded products.
   */
  getMoreProduct() {
    const productInstance = Product.getInstance()
    const ruleFilter = RuleFilter.getInstance()

    this.showMoreProductBtn.addEventListener('click', async (event) => {
      this.loaderInstance.showLoader()
      const limit = Number(event.target.getAttribute('data-limit'))
      event.target.setAttribute('data-limit', limit + 10)
      ruleFilter.setFilter({
        value: this.inputEle.value,
        limit,
      })
      const newProducts = await productInstance.getMoreProduct(ruleFilter)
      if (newProducts.length) {
        let html = ''
        newProducts.forEach((product) => {
          html += renderProductCard(product)
        })
        this.renderProductEle.innerHTML += html
        this.showMoreProductBtn.style.display = 'block'
      } else {
        this.showMoreProductBtn.style.display = 'none'
      }
      this.loaderInstance.hideLoader()
    })
  }
}

export default HomePage
