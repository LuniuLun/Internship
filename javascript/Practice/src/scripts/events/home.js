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

  static getInstance() {
    if (!HomePage.instance) {
      HomePage.instance = new HomePage()
    }
    return HomePage.instance
  }

  static dropdownToggle() {
    const toggleBtn = document.querySelector('.js-btn-toggle')
    const sortOption = document.querySelector('.js-sort-option')

    toggleBtn.addEventListener('click', () => {
      sortOption.classList.toggle('show')
    })
  }

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
        homeInstance.showEditForm()
      })
    })
  }

  static showForm() {
    const getFormEle = document.querySelector('.js-get-form')
    const wrapperFormEle = document.querySelector('.js-wrapper-form')

    getFormEle.addEventListener('click', () => {
      const formHTML = ProductTemplate.renderForm({})
      wrapperFormEle.innerHTML = formHTML
      wrapperFormEle.classList.add('show')
      HomePage.hiddenForm()
      HomePage.submitForm()
    })
  }

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
        }
      })
    })
  }

  static hiddenForm() {
    const hiddenFormBtn = document.querySelector('.js-hidden-form')
    const wrapperFormEle = document.querySelector('.js-wrapper-form')

    hiddenFormBtn.addEventListener('click', (e) => {
      e.preventDefault()
      wrapperFormEle.classList.remove('show')
    })
  }

  static submitForm() {
    const formEle = document.getElementById('js-product-form')
    const homePageInstance = HomePage.getInstance()
    const newProduct = {}

    formEle.addEventListener('submit', (e) => {
      e.preventDefault()
      Array.from(formEle.elements).forEach((element) => {
        if (element && element.value !== 'Save' && element.value !== 'Cancel') {
          newProduct[element.name] = element.value
        }
      })

      if (HomePage.validationForm(newProduct)) {
        homePageInstance.productInstance.submitProduct(newProduct)
      }
    })
  }

  static validationForm(newProduct) {
    const messageArr = {
      'name-error': ValidationForm.checkName('name', newProduct.name),
      'price-error': ValidationForm.checkPrice('price', newProduct.price),
      'quantity-error': ValidationForm.checkQuantity(
        'quantity',
        newProduct.quantity,
      ),
      'imageURL-error': ValidationForm.checkImageURL(
        'imageURL',
        newProduct.imageURL,
      ),
    }
    let flag = true
    Object.keys(messageArr).forEach((key) => {
      const errorEle = document.querySelector(`.js-${key}`)
      if (messageArr[key] !== true) {
        errorEle.classList.add('show')
        errorEle.innerHTML = messageArr[key]
        flag = false
      } else {
        errorEle.classList.remove('show')
      }
    })
    return flag
  }

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

  static acceptPopup() {
    const getAcceptPopupEle = document.querySelector('.js-accept')
    const homePageInstance = HomePage.getInstance()

    getAcceptPopupEle.addEventListener('click', async (event) => {
      await homePageInstance.productInstance.deleteProduct(event.target.id)
    })
  }

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
