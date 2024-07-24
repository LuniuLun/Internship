class Notification {
  constructor() {
    this.instance = this
  }

  static getInstance() {
    if (!Notification.instance) {
      Notification.instance = new Notification()
    }
    return Notification.instance
  }

  static renderNotification() {
    const message = localStorage.getItem('Message')

    if (message) {
      const messageEle = document.querySelector('.message')
      const contentMessageEle = document.querySelector('.message__content')
      contentMessageEle.textContent = message
      messageEle.classList.add('show')

      localStorage.removeItem('Message')
    }
  }
}

export default Notification
