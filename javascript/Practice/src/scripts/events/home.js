import ProductTemplate from '../template/product'
import PopupTemplate from '../template/popup'
import Product from '../objects/product'
import ValidationForm from '../utilities/validationForm'
import RuleFilter from '../utilities/filterRule'

class HomePage {
  constructor() {
    this.instance = this
    this.productInstance = Product.getInstance()
    this.validationFormInstance = ValidationForm.getInstance()
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
   * Toggles the visibility of the dropdown menu for sorting options.
   */
  static dropdownToggle() {
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
  static filterProduct() {
    const inputEle = document.querySelector('.js-filter-input')
    const sortOptionEle = document.querySelectorAll('.sort-option__item')
    const sortOption = document.querySelector('.js-sort-option')
    const productInstance = Product.getInstance()
    const homeInstance = HomePage.getInstance()
    const ruleFilter = RuleFilter.getInstance()

    inputEle.addEventListener('change', async (event) => {
      ruleFilter.setFilter({ value: event.target.value })
      await productInstance.filterProduct(ruleFilter)
      HomePage.showPopup()
      HomePage.showForm()
      HomePage.validationImage()
      homeInstance.showEditForm()
    })

    sortOptionEle.forEach((ele) => {
      ele.addEventListener('click', async (event) => {
        sortOption.classList.remove('show')
        const typeOfSort = event.target.getAttribute('data-value')
        ruleFilter.setFilter({ typeOfSort, value: inputEle.value })
        await productInstance.filterProduct(ruleFilter)
        HomePage.showPopup()
        HomePage.showForm()
        HomePage.validationImage()
        homeInstance.showEditForm()
      })
    })
  }

  /**
   * Displays the form for adding a new product.
   */
  static showForm() {
    const getFormEle = document.querySelector('.js-get-form')
    const wrapperFormEle = document.querySelector('.js-wrapper-form')

    getFormEle.addEventListener('click', () => {
      const formHTML = ProductTemplate.renderForm({})
      wrapperFormEle.innerHTML = formHTML
      wrapperFormEle.classList.add('show')
      HomePage.hiddenForm()
      HomePage.submitForm()
      HomePage.validationImage()
    })
  }

  /**
   * Displays the form for editing an existing product.
   */
  showEditForm() {
    const getEditFormEle = document.querySelectorAll('.js-edit-form')
    const wrapperFormEle = document.querySelector('.js-wrapper-form')

    getEditFormEle.forEach((ele) => {
      ele.addEventListener('click', async (event) => {
        const currentProduct = await this.productInstance.getProductById(
          event.target.id,
        )
        if (currentProduct !== null) {
          const formHTML = ProductTemplate.renderForm(currentProduct)
          wrapperFormEle.innerHTML = formHTML
          wrapperFormEle.classList.add('show')
          HomePage.hiddenForm()
          HomePage.submitForm()
          HomePage.validationImage()
        }
      })
    })
  }

  /**
   * Hides the form for adding or editing a product.
   */
  static hiddenForm() {
    const hiddenFormBtn = document.querySelector('.js-hidden-form')
    const wrapperFormEle = document.querySelector('.js-wrapper-form')

    hiddenFormBtn.addEventListener('click', (e) => {
      e.preventDefault()
      wrapperFormEle.classList.remove('show')
    })
  }

  /**
   * Handles the form submission for adding or editing a product.
   */
  static submitForm() {
    const formEle = document.getElementById('js-product-form')
    const homePageInstance = HomePage.getInstance()
    const newProduct = {}

    formEle.addEventListener('submit', async (e) => {
      e.preventDefault()
      Array.from(formEle.elements).forEach((element) => {
        if (element && element.value !== 'Save' && element.value !== 'Cancel') {
          newProduct[element.name] = element.value
        }
      })
      if (await HomePage.validationForm(newProduct)) {
        homePageInstance.productInstance.submitProduct(newProduct)
      }
    })
  }

  static async validationImage() {
    const imageURLEle = document.querySelector('.js-check-imageURL')

    imageURLEle.addEventListener('change', async (event) => {
      const imageURL = event.target.value
      const validationResult = await ValidationForm.checkImageURL(
        'imageURL',
        imageURL,
      )
      const errorEle = document.querySelector('.js-imageURL-error')

      if (validationResult !== true) {
        errorEle.textContent = validationResult
        errorEle.classList.add('show')
        return
      }
      errorEle.textContent = ''
      errorEle.classList.remove('show')
    })
  }

  /**
   * Validates the product form fields.
   * @param {Object} newProduct - The product data to be validated.
   * @returns {boolean} True if the form is valid, otherwise false.
   */
  static async validationForm(newProduct) {
    const messageArr = {
      'name-error': ValidationForm.checkName('name', newProduct.name),
      'price-error': ValidationForm.checkPrice('price', newProduct.price),
      'quantity-error': ValidationForm.checkQuantity(
        'quantity',
        newProduct.quantity,
      ),
      'imageURL-error': await ValidationForm.checkImageURL(
        'imageURL',
        newProduct.imageURL,
      ),
    }
    Object.keys(messageArr).forEach((key) => {
      const errorEle = document.querySelector(`.js-${key}`)
      if (messageArr[key] !== true) {
        errorEle.classList.add('show')
        errorEle.innerHTML = messageArr[key]
        return false
      }
      errorEle.classList.remove('show')
      return true
    })
  }

  /**
   * Displays the popup for confirming product deletion.
   */
  static showPopup() {
    const getPopupEle = document.querySelectorAll('.js-get-popup')
    const wrapperPopupEle = document.querySelector('.js-wrapper-popup')

    getPopupEle.forEach((ele) => {
      ele.addEventListener('click', (event) => {
        const popupHTML = PopupTemplate.renderPopup(event.target.id)
        wrapperPopupEle.innerHTML = popupHTML
        wrapperPopupEle.classList.add('show')
        HomePage.hiddenForm()
        HomePage.acceptPopup()

        const popupEle = document.querySelector('.popup')
        const rect = event.target.getBoundingClientRect()
        const popupTop = rect.top + window.scrollY
        popupEle.style.marginTop = `${popupTop}px`
      })
    })
  }

  /**
   * Handles the confirmation of product deletion.
   */
  static acceptPopup() {
    const getAcceptPopupEle = document.querySelector('.js-accept')
    const homePageInstance = HomePage.getInstance()

    getAcceptPopupEle.addEventListener('click', async (event) => {
      await homePageInstance.productInstance.deleteProduct(event.target.id)
    })
  }

  /**
   * Loads more products when the "show more" button is clicked.
   */
  static getMoreProduct() {
    const getMoreProductEle = document.querySelector('.js-show-more-product')
    const inputEle = document.querySelector('.js-filter-input')
    const productInstance = Product.getInstance()
    const homeInstance = HomePage.getInstance()
    const ruleFilter = RuleFilter.getInstance()

    getMoreProductEle.addEventListener('click', async (event) => {
      const limit = event.target.getAttribute('data-value')
      event.target.setAttribute('data-value', Number(limit) + 10)
      ruleFilter.setFilter({
        value: inputEle.value,
        limit,
      })
      await productInstance.filterProduct(ruleFilter)
      HomePage.showPopup()
      HomePage.showForm()
      homeInstance.showEditForm()
    })
  }
}

export default HomePage
