class PopupTemplate {
  constructor() {
    this.instance = this
  }

  static getInstance() {
    if (!PopupTemplate.instance) {
      PopupTemplate.instance = new PopupTemplate()
    }
    return PopupTemplate.instance
  }

  static renderPopup(id) {
    return `          
          <div class="popup">
            <h2 class="popup__content">
              Are you sure you want to delete this food?
            </h2>
            <div class="popup__action">
              <button class="btn btn--line js-hidden-form">Cancel</button>
              <button class="btn btn--fill js-accept" id="${id}">Yes</button>
            </div>
          </div>`
  }
}

export default PopupTemplate
