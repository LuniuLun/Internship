/* eslint-disable class-methods-use-this */
class Loader {
  constructor() {
    this.instance = this
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Loader()
    }
    return this.instance
  }

  showLoader() {
    const popupEle = document.querySelector('.js-wrapper-popup')
    const loaderEle = document.createElement('div')
    popupEle.innerHTML = ''
    loaderEle.classList.add('loader')
    popupEle.appendChild(loaderEle)
    popupEle.classList.add('show')
  }

  hideLoader() {
    const popupEle = document.querySelector('.js-wrapper-popup')
    popupEle.classList.remove('show')
    popupEle.innerHTML = ''
  }
}

export default Loader
