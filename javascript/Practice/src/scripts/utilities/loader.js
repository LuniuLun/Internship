/* eslint-disable class-methods-use-this */
class Loader {
  constructor() {
    this.instance = this
  }

  static getInstance() {
    if (!Loader.instance) {
      Loader.instance = new Loader()
    }
    return Loader.instance
  }

  showLoader() {
    const popupEle = document.querySelector('.js-wrapper-popup')
    const loaderEle = document.createElement('div')
    loaderEle.classList.add('loader')
    popupEle.appendChild(loaderEle)
    popupEle.classList.add('show')
  }

  hideLoader() {
    const popupEle = document.querySelector('.js-wrapper-popup')
    const loaderEle = popupEle.querySelector('.loader')
    popupEle.classList.remove('show')
    if (loaderEle) {
      popupEle.removeChild(loaderEle)
    }
  }
}

export default Loader
