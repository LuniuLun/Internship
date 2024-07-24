import ProductTemplate from '../template/product'
import Product from '../objects/product'
import ValidationForm from './validationForm'

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

    formEle.addEventListener('submit', async (e) => {
      e.preventDefault()
      for (let i = 0; i < formEle.length; i += 1) {
        const element = formEle.elements[i]
        if (element && element.value !== 'Save' && element.value !== 'Cancel') {
          newProduct[element.name] = element.value
        }
      }
      if (HomePage.validationForm(newProduct)) {
        await homePageInstance.productInstance.submitProduct(newProduct)
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
}

export default HomePage
