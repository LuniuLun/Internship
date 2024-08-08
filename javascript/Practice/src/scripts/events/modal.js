/* eslint-disable class-methods-use-this */
import ModalTemplate from '../template/modal'
import ValidationForm from '../utilities/validationForm'
import Product from '../product'
import EventBus from '../utilities/eventBus'
import Loader from '../utilities/loader'

class Modal {
  constructor(currentProduct) {
    this.instance = this
    this.currentProduct = currentProduct
    this.loaderInstance = Loader.getInstance()
    this.productInstance = Product.getInstance()
    this.eventBusInstance = EventBus.getInstance()
    this.validationImageResult = undefined
  }

  /**
   * Singleton pattern to ensure only one instance of Modal exists.
   * @param {Object} currentProduct - The current product data.
   * @returns {Modal} The instance of Modal.
   */
  static getInstance(currentProduct = {}) {
    if (!this.instance) {
      this.instance = new Modal(currentProduct)
    } else {
      this.instance.currentProduct = currentProduct
    }
    return this.instance
  }

  /**
   * Retrieves the current product data.
   * @returns {Object} The current product data.
   */
  getter() {
    return { currentProduct: this.currentProduct }
  }

  /**
   * Sets the current product data.
   * @param {Object} currentProduct - The new product data to set.
   */
  setter(currentProduct) {
    this.currentProduct = currentProduct
  }

  /**
   * Displays the form for adding or editing a product.
   * If an ID is provided, it loads the corresponding product data for editing.
   * @param {string} id - The ID of the product to edit (optional).
   */
  showForm(id) {
    const wrapperFormEle = document.querySelector('.js-wrapper-popup')
    if (id)
      this.currentProduct = this.productInstance
        .getter()
        .products.find((product) => product.id === id)
    const formHTML = ModalTemplate.renderProductForm(this.currentProduct)
    wrapperFormEle.innerHTML = formHTML
    wrapperFormEle.classList.add('show')
    this.hideForm()
    this.submitForm()
    this.validationImage()
    this.pressOnlyRealNumber()
    this.pressOnlyIntegerNumber()
  }

  /**
   * Hides the form for adding or editing a product.
   * Clears the form content and hides the form container.
   */
  hideForm() {
    const hiddenFormBtn = document.querySelector('.js-hidden-form')
    const wrapperFormEle = document.querySelector('.js-wrapper-popup')

    hiddenFormBtn.addEventListener('click', (e) => {
      e.preventDefault()
      wrapperFormEle.classList.remove('show')
      wrapperFormEle.innerHTML = ''
    })
  }

  /**
   * Handles the form submission for adding or editing a product.
   * Validates the form and submits the data if valid.
   */
  submitForm() {
    const formEle = document.getElementById('js-product-form')
    const productInstance = Product.getInstance()
    const newProduct = {}
    formEle.addEventListener('submit', async (e) => {
      e.preventDefault()
      Array.from(e.target).forEach((element) => {
        if (element && element.value !== 'Save' && element.value !== 'Cancel') {
          newProduct[element.name] = element.value
        }
      })
      if (this.validationForm(newProduct) && !this.validationImageResult) {
        const wrapperFormEle = document.querySelector('.js-wrapper-popup')
        wrapperFormEle.classList.remove('show')
        this.loaderInstance.showLoader()
        const response = await productInstance.submitProduct(newProduct)
        this.validationImageResult = false
        if (response.status === 'success') {
          this.eventBusInstance.emit('reloadProduct')
        }
        this.loaderInstance.hideLoader()
      }
    })
  }

  /**
   * Restricts input to real numbers (including decimals) only.
   * Prevents invalid characters from being entered in the input fields.
   */
  pressOnlyRealNumber() {
    const numInputEle = document.querySelectorAll('.js-only-real-number')
    numInputEle.forEach((ele) => {
      ele.addEventListener('keypress', (event) => {
        const { charCode } = event
        const currentValue = ele.value
        // Check if the user entered a number starting with a period
        if (charCode === 46 && ele.selectionStart === 0) {
          event.preventDefault()
          return
        }
        // Check if there is already a period and the user re-enters the period
        if (currentValue.includes('.') && charCode === 46) {
          event.preventDefault()
          return
        }
        // Check if not a number or a dot
        if ((charCode < 48 || charCode > 57) && charCode !== 46) {
          event.preventDefault()
        }
      })
    })
  }

  /**
   * Restricts input to integer numbers only.
   * Prevents invalid characters from being entered in the input fields.
   */
  pressOnlyIntegerNumber() {
    const intInputElements = document.querySelectorAll(
      '.js-only-integer-number',
    )
    intInputElements.forEach((ele) => {
      ele.addEventListener('keypress', (event) => {
        const { charCode } = event
        // Check if not a number
        if (charCode < 48 || charCode > 57) {
          event.preventDefault()
        }
      })
    })
  }

  /**
   * Validates the image URL field when the input value changes.
   * This method listens for changes in the image URL input field,
   * performs validation, and updates the error message accordingly.
   */
  async validationImage() {
    const imageURLEle = document.querySelector('.js-check-imageURL')
    imageURLEle.addEventListener('change', async (event) => {
      const imageURL = event.target.value
      const validationResult = await ValidationForm.checkImageURL(
        'imageURL',
        imageURL,
      )
      const errorEle = document.querySelector('.js-imageURL-error')

      if (validationResult) {
        errorEle.textContent = validationResult
        errorEle.classList.add('show')
        this.validationImageResult = validationResult
        return
      }
      errorEle.textContent = ''
      errorEle.classList.remove('show')
      this.validationImageResult = false
    })
  }

  /**
   * Validates the product form fields.
   * @param {Object} newProduct - The product data to be validated.
   * @returns {boolean} True if the form is valid, otherwise false.
   */
  validationForm(newProduct) {
    let check = true
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
        false,
    }
    Object.keys(messageArr).forEach((key) => {
      const errorEle = document.querySelector(`.js-${key}`)
      if (messageArr[key]) {
        errorEle.innerHTML = messageArr[key]
        check = false
        return
      }
      errorEle.innerHTML = ''
    })
    return check
  }

  /**
   * Displays the popup for confirming product deletion.
   * @param {string} id - The ID of the product to be deleted.
   */
  showWarningForm(id) {
    const wrapperModalEle = document.querySelector('.js-wrapper-popup')
    wrapperModalEle.innerHTML = ModalTemplate.renderWarning(id)
    wrapperModalEle.classList.add('show')

    this.hideForm()
    this.acceptWarningForm()
  }

  /**
   * Handles the confirmation of product deletion.
   */
  acceptWarningForm() {
    const getAcceptWarningFormEle = document.querySelector('.js-accept')
    const productInstance = Product.getInstance()

    getAcceptWarningFormEle.addEventListener('click', async (event) => {
      const wrapperModalEle = document.querySelector('.js-wrapper-popup')
      wrapperModalEle.classList.remove('show')
      this.loaderInstance.showLoader()
      const response = await productInstance.deleteProduct(event.target.id)
      if (response.status === 'success') {
        this.eventBusInstance.emit('reloadProduct')
      }
      this.loaderInstance.hideLoader()
    })
  }
}

export default Modal
