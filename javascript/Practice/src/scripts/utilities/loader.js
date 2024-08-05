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