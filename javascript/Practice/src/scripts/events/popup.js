import ProductTemplate from '../template/product'
import PopupTemplate from '../template/popup'
import ValidationForm from '../utilities/validationForm'
import Product from '../product'

class Popup {
  constructor(currentProduct) {
    this.instance = this
    this.currentProduct = currentProduct
    this.validationImageResult = true
  }

  /**
   * Singleton pattern to ensure only one instance of Popup exists.
   * @param {Object} currentProduct - The current product data.
   * @returns {Popup} The instance of Popup.
   */
  static getInstance(currentProduct = {}) {
    if (!Popup.instance) {
      Popup.instance = new Popup(currentProduct)
    } else {
      Popup.instance.currentProduct = currentProduct
    }
    return Popup.instance
  }

  /**
   * Displays the form for adding or editing a product.
   */
  showForm() {
    const wrapperFormEle = document.querySelector('.js-wrapper-form')
    const formHTML = ProductTemplate.renderForm(this.currentProduct)
    wrapperFormEle.innerHTML = formHTML
    wrapperFormEle.classList.add('show')
    this.hiddenForm()
    this.submitForm()
    this.validationImage()
  }

  /**
   * Hides the form for adding or editing a product.
   */
  hiddenForm() {
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
  submitForm() {
    const formEle = document.getElementById('js-product-form')
    const productInstance = Product.getInstance()
    const newProduct = {}
    formEle.addEventListener('submit', async (e) => {
      e.preventDefault()
      Array.from(formEle.elements).forEach((element) => {
        if (element && element.value !== 'Save' && element.value !== 'Cancel') {
          newProduct[element.name] = element.value
        }
      })
      if (this.validationForm(newProduct) && this.validationImageResult) {
        productInstance.submitProduct(newProduct)
        this.validationImageResult = false
      }
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
        true,
    }
    Object.keys(messageArr).forEach((key) => {
      const errorEle = document.querySelector(`.js-${key}`)
      if (messageArr[key] !== true) {
        errorEle.classList.add('show')
        errorEle.innerHTML = messageArr[key]
        check = false
      }
      errorEle.classList.remove('show')
    })
    return check
  }

  /**
   * Displays the popup for confirming product deletion.
   * @param {string} id - The ID of the product to be deleted.
   * @param {number} popupTop - The top position of the popup.
   */
  showWarningForm(id, popupTop) {
    const wrapperPopupEle = document.querySelector('.js-wrapper-popup')
    wrapperPopupEle.innerHTML = PopupTemplate.renderPopup(id)
    wrapperPopupEle.classList.add('show')
    const popupEle = document.querySelector('.popup')
    popupEle.style.marginTop = `${popupTop}px`

    this.hiddenForm()
    this.acceptWarningForm()
  }

  /**
   * Handles the confirmation of product deletion.
   */
  acceptWarningForm() {
    const getAcceptWarningFormEle = document.querySelector('.js-accept')
    const productInstance = Product.getInstance()

    getAcceptWarningFormEle.addEventListener('click', async (event) => {
      await productInstance.deleteProduct(event.target.id)
    })
  }
}

export default Popup
