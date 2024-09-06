class Loader {
  private static instance: Loader
  private popupEle: HTMLElement | null

  private constructor() {
    this.popupEle = document.querySelector('.js-wrapper-loader')
  }

  public static getInstance(): Loader {
    if (!this.instance) {
      this.instance = new this()
    }

    return this.instance
  }

  // Displays the loader by adding a loader element to the popup and making it visible
  public showLoader(): { error?: string } | undefined {
    if (!this.popupEle) return { error: 'Loader element not found' }
    this.popupEle.innerHTML = `<div class='loader'></div>`
    this.popupEle.classList.add('show')
  }

  // Hides the loader by removing the 'show' class from the popup
  public hideLoader(): void {
    if (!this.popupEle) return
    this.popupEle.classList.remove('show')
  }
}

export default Loader