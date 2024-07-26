import ProductTemplate from '../template/product'
import PopupTemplate from '../template/popup'
import Product from '../product'
import ValidationForm from '../utilities/validationForm'

class Form {
  constructor() {
    this.instance = this
    this.productInstance = Product.getInstance()
    this.validationImageResult = false
  }

  static getInstance() {
    if (!Form.instance) {
      Form.instance = new Form()
    }
    return Form.instance
  }

  static create() {
    const formInstance = Form.getInstance()
    Form.showForm()
    Form.showPopup()
    formInstance.showEditForm()
  }

  /**
   * Displays the form for adding a new product.
   */
  static showForm() {
    const getFormEle = document.querySelector('.js-get-form')
    const wrapperFormEle = document.querySelector('.js-wrapper-form')
    const formInstance = Form.getInstance()
    getFormEle.addEventListener('click', () => {
      const formHTML = ProductTemplate.renderForm({})
      wrapperFormEle.innerHTML = formHTML
      wrapperFormEle.classList.add('show')
      formInstance.registerEventAfterLoadForm()
      Form.hiddenForm()
      Form.submitForm()
      Form.validationImage()
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
          Form.hiddenForm()
          Form.submitForm()
          Form.validationImage()
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
    const formInstanceInstance = Form.getInstance()
    const newProduct = {}

    formEle.addEventListener('submit', async (e) => {
      e.preventDefault()
      Array.from(formEle.elements).forEach((element) => {
        if (element && element.value !== 'Save' && element.value !== 'Cancel') {
          newProduct[element.name] = element.value
        }
      })
      if (Form.validationForm(newProduct) && this.validationImageResult) {
        formInstanceInstance.productInstance.submitProduct(newProduct)
        this.validationImageResult = false
      }
    })
  }

  /**
   * Validates the image URL field when the input value changes.
   * This method listens for changes in the image URL input field,
   * performs validation, and updates the error message accordingly.
   */
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
        this.validationImageResult = validationResult
        return
      }
      errorEle.textContent = ''
      errorEle.classList.remove('show')
      this.validationImageResult = true
    })
  }

  /**
   * Validates the product form fields.
   * @param {Object} newProduct - The product data to be validated.
   * @returns {boolean} True if the form is valid, otherwise false.
   */
  static validationForm(newProduct) {
    const messageArr = {
      'name-error': ValidationForm.checkName('name', newProduct.name),
      'price-error': ValidationForm.checkPrice('price', newProduct.price),
      'quantity-error': ValidationForm.checkQuantity(
        'quantity',
        newProduct.quantity,
      ),
      'imageURL-error':
        ValidationForm.isNotEmpty('imageURL', newProduct.imageURL) ||
        this.validationImageResult ||
        true,
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
        Form.hiddenForm()
        Form.acceptPopup()

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
    const formInstanceInstance = Form.getInstance()

    getAcceptPopupEle.addEventListener('click', async (event) => {
      await formInstanceInstance.productInstance.deleteProduct(event.target.id)
    })
  }
}

export default Form
