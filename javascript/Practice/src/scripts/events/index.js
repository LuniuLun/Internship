class EventDOM {
  constructor() {
    this.instance = this
  }

  static getInstance() {
    if (!EventDOM.instance) {
      EventDOM.instance = new EventDOM()
    }
    return EventDOM.instance
  }

  DropdownToggle() {
    document.addEventListener('DOMContentLoaded', () => {
      const btnToggle = document.querySelector('.js-btn-toggle')
      const sortOption = document.querySelector('.js-sort-option')

      const toggleSortOption = () => {
        sortOption.classList.toggle('show')
      }

      if (btnToggle && !btnToggle.eventListenerAdded) {
        btnToggle.addEventListener('click', toggleSortOption)
        btnToggle.eventListenerAdded = true
      }
    })
  }
}

const instance = EventDOM.getInstance()
instance.DropdownToggle()
