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
      const messageEle = document.querySelector('.js-success-message')
      const contentMessageEle = document.querySelector(
        '.js-success-content-message',
      )
      contentMessageEle.textContent = message
      messageEle.classList.add('show')
      setTimeout(() => {
        messageEle.classList.remove('show')
      }, 2000)
      localStorage.removeItem('Message')
    }
  }

  static renderErrorNotification(message) {
    if (message) {
      const messageEle = document.querySelector('.js-failed-message')
      const contentMessageEle = document.querySelector(
        '.js-failed-content-message',
      )
      contentMessageEle.textContent = message
      messageEle.classList.add('show')
      setTimeout(() => {
        messageEle.classList.remove('show')
      }, 2000)
      localStorage.removeItem('Message')
    }
  }
}

export default Notification
