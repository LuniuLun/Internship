/* eslint-disable class-methods-use-this */
class Loader {
  constructor() {
    this.instance = this
    this.popupEle = document.querySelector('.js-wrapper-loader')
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Loader()
    }
    return this.instance
  }

  showLoader() {
    this.popupEle.innerHTML = `<div class='loader'></div>`
    this.popupEle.classList.add('show')
  }

  hideLoader() {
    this.popupEle.classList.remove('show')
  }
}

export default Loader
