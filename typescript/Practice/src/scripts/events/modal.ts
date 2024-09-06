/* eslint-disable class-methods-use-this */
import ModalTemplate from '../template/modal'
import ValidationForm from '../utilities/validationForm'
import Product from '../models/product'
import EventBus from '../utilities/eventBus'
import Loader from '../utilities/loader'
import REGEXP from '../constants/regExp'
import handleErrors from '../utilities/handleError'
import getValidElements from '../utilities/getValidElement'

class Modal {
  private static instance: Modal
  private currentProduct: TProduct | {}
  private loaderInstance: Loader
  private productInstance: Product
  private eventBusInstance: EventBus
  private wrapperModalEle: HTMLElement | null
  private validationImageResult: string | undefined
  wrapperPage: HTMLElement | null

  private constructor(currentProduct: TProduct | {}) {
    this.currentProduct = currentProduct
    this.loaderInstance = Loader.getInstance()
    this.productInstance = Product.getInstance()
    this.eventBusInstance = EventBus.getInstance()
    this.validationImageResult = undefined
    this.wrapperModalEle = handleErrors(() =>
      getValidElements(document.querySelector('.js-wrapper-popup')),
    )
    this.wrapperPage = handleErrors(() =>
      getValidElements(document.querySelector('.js-wrapper-page')),
    )
  }

  /**
   * Singleton pattern to ensure only one instance of Modal exists.
   */
  public static getInstance(currentProduct: TProduct | {}) {
    if (!this.instance) {
      this.instance = new Modal(currentProduct)
    } else {
      this.instance.currentProduct = currentProduct
    }
    return this.instance
  }

  getter() {
    return { currentProduct: this.currentProduct }
  }

  setter(currentProduct: TProduct) {
    this.currentProduct = currentProduct
  }

  /**
   * Displays the form for adding or editing a product.
   */
  showForm(id?: string) {
    this.currentProduct = id
      ? this.productInstance
          .getter()
          .find((product: { id: string }) => product.id === id) || {}
      : {}
    const formHTML = ModalTemplate.renderProductForm(this.currentProduct)
    this.wrapperModalEle = handleErrors(() =>
      getValidElements(this.wrapperModalEle),
    )
    if (!this.wrapperModalEle) return

    this.wrapperModalEle.innerHTML = formHTML
    this.wrapperModalEle.classList.add('show')
    this.setupFormHandlers()
  }

  /**
   * Sets up event handlers for form operations.
   */
  setupFormHandlers() {
    this.hideForm()
    this.submitForm()
    this.validationImage()
    this.pressOnlyRealNumber()
    this.pressOnlyIntegerNumber()
  }

  /**
   * Hides the form for adding or editing a product.
   */
  hideForm() {
    this.wrapperModalEle?.addEventListener('click', (e: MouseEvent) => {
      const targetElement = e.target as HTMLElement
      if (
        !targetElement.closest('#js-product-form') ||
        targetElement.closest('.js-hidden-form')
      ) {
        e.preventDefault()
        this.wrapperModalEle!.classList.remove('show')
        this.wrapperModalEle!.innerHTML = ''
      }
    })
  }

  /**
   * Handles the form submission for adding or editing a product.
   */
  submitForm() {
    const formEle = handleErrors(() =>
      getValidElements(this.wrapperModalEle?.querySelector('#js-product-form')),
    )
    if (!formEle) {
      return
    }

    const productInstance = Product.getInstance()
    const newProduct: TProduct = {
      id: '',
      name: '',
      imageURL: '',
      price: '',
      quantity: '',
    }

    formEle.addEventListener('submit', async (e: Event) => {
      e.preventDefault()
      if (!e.target) {
        return
      }
      const target = e.target as HTMLFormElement

      Array.from(target.elements).forEach((element) => {
        if (
          element instanceof HTMLInputElement ||
          element instanceof HTMLSelectElement ||
          element instanceof HTMLTextAreaElement
        ) {
          if (
            element.name &&
            element.value !== 'Save' &&
            element.value !== 'Cancel'
          ) {
            newProduct[element.name as keyof TProduct] = element.value
          }
        }
      })

      if (this.validationForm(newProduct) && !this.validationImageResult) {
        this.wrapperModalEle!.classList.remove('show')
        this.loaderInstance.showLoader()
        const response = await productInstance.submitProduct(newProduct)
        this.validationImageResult = ''
        if (response.status === 'success') {
          this.eventBusInstance.emit('reloadProduct', {})
        }
        this.loaderInstance.hideLoader()
      }
    })
  }

  /**
   * Restricts input to real numbers only.
   */
  pressOnlyRealNumber() {
    const realNumInputEle = handleErrors(() =>
      getValidElements(
        this.wrapperModalEle?.querySelector('.js-only-real-number'),
      ),
    )

    if (!realNumInputEle) {
      return
    }
    const inputElement = realNumInputEle as HTMLInputElement

    inputElement.addEventListener('keypress', (event: KeyboardEvent) => {
      const { charCode } = event
      const currentValue = inputElement.value

      if (charCode === REGEXP.CHAR_CODE_DOT) {
        if (inputElement.selectionStart === 0 || currentValue.includes('.')) {
          event.preventDefault()
        }
      } else if (
        charCode < REGEXP.CHAR_CODE_0 ||
        charCode > REGEXP.CHAR_CODE_9
      ) {
        event.preventDefault()
      }
    })
  }

  /**
   * Restricts input to integer numbers only.
   */
  pressOnlyIntegerNumber() {
    const intNumInputElements = handleErrors(() =>
      getValidElements(
        this.wrapperModalEle?.querySelector('.js-only-integer-number'),
      ),
    )

    if (!intNumInputElements) {
      return
    }
    const inputElement = intNumInputElements as HTMLInputElement

    inputElement.addEventListener('keypress', (event: KeyboardEvent) => {
      if (
        event.charCode < REGEXP.CHAR_CODE_0 ||
        event.charCode > REGEXP.CHAR_CODE_9
      ) {
        event.preventDefault()
      }
    })
  }

  /**
   * Validates the image URL field.
   */
  async validationImage() {
    const imageURLEle = handleErrors(() =>
      getValidElements(
        this.wrapperModalEle?.querySelector('.js-check-imageURL'),
      ),
    )
    const errorEle = handleErrors(() =>
      getValidElements(
        this.wrapperModalEle?.querySelector('.js-imageURL-error'),
      ),
    )

    if (!imageURLEle || !errorEle) {
      return
    }
    const inputElement = imageURLEle as HTMLInputElement

    inputElement.addEventListener('change', async (event) => {
      if (!event.target) {
        return
      }
      const target = event.target as HTMLInputElement
      const imageURL = target.value
      const validationResult = await ValidationForm.checkImageURL(
        'imageURL',
        imageURL,
      )
      errorEle.textContent = validationResult || ''
      errorEle.classList.toggle('show', !!validationResult)
      this.validationImageResult = validationResult || ''
    })
  }

  /**
   * Validates the product form fields.
   */
  validationForm(newProduct: TProduct) {
    const messageArr = {
      'name-error': ValidationForm.checkName('name', newProduct.name),
      'price-error': ValidationForm.checkPrice('price', newProduct.price),
      'quantity-error': ValidationForm.checkQuantity(
        'quantity',
        newProduct.quantity,
      ),
      'imageURL-error': ValidationForm.isNotEmpty(
        'imageURL',
        newProduct.imageURL,
      )
        ? ValidationForm.isNotEmpty('imageURL', newProduct.imageURL)
        : this.validationImageResult
          ? 'Invalid image URL'
          : '',
    }

    let isValid = true

    Object.entries(messageArr).forEach(([key, message]) => {
      const errorEle = handleErrors(() =>
        getValidElements(this.wrapperModalEle?.querySelector(`.js-${key}`)),
      )
      if (errorEle) {
        errorEle.innerHTML = message || ''
        if (message) isValid = false
      }
    })

    return isValid
  }

  /**
   * Displays the popup for confirming product deletion.
   * @param id - The ID of the product to be deleted.
   */
  showWarningForm(id: string) {
    if (this.wrapperModalEle) {
      this.wrapperModalEle.innerHTML = ModalTemplate.renderWarning(id)
      this.wrapperModalEle.classList.add('show')
      this.setupWarningHandlers()
    }
  }

  /**
   * Sets up event handlers for the warning form.
   */
  setupWarningHandlers() {
    this.hideForm()
    this.acceptWarningForm()
  }

  /**
   * Handles the confirmation of product deletion.
   */
  acceptWarningForm() {
    const getAcceptWarningFormEle = handleErrors(() =>
      getValidElements(this.wrapperModalEle?.querySelector('.js-accept')),
    )
    if (!getAcceptWarningFormEle) {
      return
    }
    const productInstance = Product.getInstance()

    getAcceptWarningFormEle.addEventListener('click', async (event: Event) => {
      if (!event.target) {
        return
      }
      const target = event.target as HTMLElement

      if (target.id) {
        this.wrapperModalEle?.classList.remove('show')
        this.loaderInstance.showLoader()
        const response = await productInstance.deleteProduct(target.id)
        if (response.status === 'success') {
          this.eventBusInstance.emit('reloadProduct', {})
        }
        this.loaderInstance.hideLoader()
      }
    })
  }
}

export default Modal
