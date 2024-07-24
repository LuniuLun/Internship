import ProductTemplate from '../template/product'
import Foods from '../products/foods'

class HomePage {
  constructor() {
    this.instance = this
    this.foodInstance = Foods.getInstance()
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
      wrapperFormEle.classList.add('show')
      const formHTML = ProductTemplate.renderForm({})
      wrapperFormEle.innerHTML = formHTML
      HomePage.hiddenForm()
      HomePage.submitForm()
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
        if (
          formEle.elements[i].value !== 'Save' ||
          formEle.elements[i].value !== 'Cancel'
        ) {
          newProduct[formEle.elements[i].name] = formEle.elements[i].value
        }
      }
      if (Object.keys(newProduct).length > 0) {
        await homePageInstance.foodInstance.submitProduct(newProduct)
      }
    })
  }
}

export default HomePage
