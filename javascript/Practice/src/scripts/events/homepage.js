import ProductTemplate from '../template/product'

class HomePage {
  constructor() {
    this.instance = this
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
    const showFormEle = document.querySelector('.js-show-form')

    getFormEle.addEventListener('click', () => {
      showFormEle.classList.add('show')
      const formHTML = ProductTemplate.renderForm()
      showFormEle.innerHTML = formHTML
      HomePage.hiddenForm()
    })
  }

  static hiddenForm() {
    const hiddenFormBtn = document.querySelector('.js-hidden-form')
    const showFormEle = document.querySelector('.js-show-form')

    hiddenFormBtn.addEventListener('click', (e) => {
      e.preventDefault()
      showFormEle.classList.remove('show')
    })
  }
}

export default HomePage
