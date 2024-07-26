import ProductTemplate from '../template/product'
import PopupTemplate from '../template/popup'
import Product from '../product'
import ValidationForm from '../utilities/validationForm'

class Popup {
  constructor() {
    this.instance = this
    this.productInstance = Product.getInstance()
    this.validationImageResult = true
  }

  static getInstance() {
    if (!Popup.instance) {
      Popup.instance = new Popup()
    }
    return Popup.instance
  }

  create() {
    const popupInstance = Popup.getInstance()
    this.showForm()
    this.showWarningForm()
    popupInstance.showEditForm()
  }

  /**
   * Displays the form for adding a new product.
   */
  showForm() {
    const getFormEle = document.querySelector('.js-get-form')
    const wrapperFormEle = document.querySelector('.js-wrapper-form')
    getFormEle.addEventListener('click', () => {
      const formHTML = ProductTemplate.renderForm({})
      wrapperFormEle.innerHTML = formHTML
      wrapperFormEle.classList.add('show')
      this.hiddenForm()
      this.submitForm()
      this.validationImage()
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
          this.hiddenForm()
          this.submitForm()
          this.validationImage()
        }
      })
    })
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
    const formInstanceInstance = Popup.getInstance()
    const newProduct = {}
    formEle.addEventListener('submit', async (e) => {
      e.preventDefault()
      Array.from(formEle.elements).forEach((element) => {
        if (element && element.value !== 'Save' && element.value !== 'Cancel') {
          newProduct[element.name] = element.value
        }
      })
      console.log(this.validationForm(newProduct))
      console.log(this.validationImageResult)
      if (this.validationForm(newProduct) && this.validationImageResult) {
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
   */
  showWarningForm() {
    const getPopupEle = document.querySelectorAll('.js-get-popup')
    const wrapperPopupEle = document.querySelector('.js-wrapper-popup')

    getPopupEle.forEach((ele) => {
      ele.addEventListener('click', (event) => {
        const popupHTML = PopupTemplate.renderPopup(event.target.id)
        wrapperPopupEle.innerHTML = popupHTML
        wrapperPopupEle.classList.add('show')
        this.hiddenForm()
        this.acceptPopup()

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
  acceptWarningForm() {
    const getAcceptWarningFormEle = document.querySelector('.js-accept')
    const formInstanceInstance = this.getInstance()

    getAcceptWarningFormEle.addEventListener('click', async (event) => {
      await formInstanceInstance.productInstance.deleteProduct(event.target.id)
    })
  }
}

export default Popup
