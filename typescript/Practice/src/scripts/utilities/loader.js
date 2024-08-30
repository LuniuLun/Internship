import BaseInstance from './baseInstance'

class Loader extends BaseInstance {
  constructor() {
    super()
    this.popupEle = document.querySelector('.js-wrapper-loader')
  }

  // Displays the loader by adding a loader element to the popup and making it visible
  showLoader() {
    this.popupEle.innerHTML = `<div class='loader'></div>`
    this.popupEle.classList.add('show')
  }

  // Hides the loader by removing the 'show' class from the popup
  hideLoader() {
    this.popupEle.classList.remove('show')
  }
}

export default Loader
