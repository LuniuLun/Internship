class Notification {
  constructor() {
    this.instance = this
  }

  /**
   * Singleton pattern to ensure only one instance of Notification exists.
   * @returns {Notification} The instance of the Notification class.
   */
  static getInstance() {
    if (!Notification.instance) {
      Notification.instance = new Notification()
    }
    return Notification.instance
  }

  /**
   * Renders a success notification if a message exists in localStorage.
   */
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

  /**
   * Renders an error notification with the provided message.
   * @param {string} message - The error message to display.
   */
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
