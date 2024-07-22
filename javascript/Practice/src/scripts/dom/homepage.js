import Template from '../template/product'
import ProductService from '../services/product'

class HomePage {
  constructor() {
    this.instance = this
    this.productTemplate = Template.getInstance()
    this.productService = ProductService.getInstance()
  }

  static init() {
    const instance = HomePage.getInstance()
    HomePage.dropdownToggle()
    HomePage.getForm()
    instance.renderProduct()
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

  static getForm() {
    const getFormEle = document.querySelector('.js-get-form')
    const showFormEle = document.querySelector('.js-show-form')

    if (getFormEle && !getFormEle.eventListenerAdded) {
      getFormEle.addEventListener('click', () => {
        showFormEle.classList.add('show')
        const formHTML = this.productTemplate.renderForm()
        showFormEle.innerHTML = formHTML
        HomePage.hiddenForm()
      })
    }
  }

  static hiddenForm() {
    const hiddenFormBtn = document.querySelector('.js-hidden-form')
    const showFormEle = document.querySelector('.js-show-form')

    hiddenFormBtn.addEventListener('click', (e) => {
      e.preventDefault()
      showFormEle.classList.remove('show')
    })
  }

  async renderProduct() {
    const renderProductEle = document.querySelector('.js-get-products')
    console.log(renderProductEle)
    let html = `            
            <div class="product product--dashed js-get-form">
              <img
                class="icon icon--padded"
                src="./assets/icons/plus.svg"
                alt="plus icon"
              />
              <span class="highlight">Add new dish</span>
            </div>`
    try {
      const products = await this.productService.getProduct()
      console.log(products)
      products.forEach((item) => {
        html += this.productTemplate.renderProductCard(
          item.id,
          item.name,
          item.imageURl,
          item.price,
          item.quantity,
        )
      })
      console.log(html)
      renderProductEle.innerHTML = html
    } catch (error) {
      console.error('Error rendering product:', error)
    }
  }
}

export default HomePage
