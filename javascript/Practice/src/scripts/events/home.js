import ProductTemplate from '../template/product'
import Product from '../product'
import RuleFilter from '../utilities/filterRule'
import Popup from './popup'

class HomePage {
  constructor() {
    this.instance = this
    this.popup = Popup.getInstance()
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

  async create() {
    const homePage = HomePage.getInstance()
    await homePage.renderProduct()
    this.popup.create()
    this.dropdownToggle()
    this.filterProduct()
    this.getMoreProduct()
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
   * @param {number} limit - The number of products to render.
   */
  async renderProduct(limit = 9) {
    const renderProductEle = document.querySelector('.js-get-products')
    renderProductEle.innerHTML = ''
    let html = ProductTemplate.renderAdditionCard()

    const products = await this.productInstance.getProduct(limit)
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
      await productInstance.filterProduct(ruleFilter).create()
    })

    sortOptionEle.forEach((ele) => {
      ele.addEventListener('click', async (event) => {
        sortOption.classList.remove('show')
        const typeOfSort = event.target.getAttribute('data-value')
        ruleFilter.setFilter({ typeOfSort, value: inputEle.value })
        await productInstance.filterProduct(ruleFilter)
        this.popup.create()
      })
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
      this.popup.create()
    })
  }
}

export default HomePage
