/* eslint-disable class-methods-use-this */
import checkIcon from '../../assets/icons/check.svg'
import closeIcon from '../../assets/icons/close.svg'

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
   * Renders a notification with the provided message and status.
   * @param {Object} options - The options for the notification.
   * @param {string} options.status - The status of the notification ('ok' or 'error').
   * @param {string} options.message - The message to display.
   */
  renderNotification({ status = '', message = '' }) {
    if (message) {
      const messageEle = document.querySelector('.js-message')
      const contentMessageEle = document.querySelector('.js-message-content')
      const iconEle = messageEle.querySelector('.message__icon')

      // Set appropriate class and icon based on the status
      if (status === 'ok') {
        messageEle.classList.add('message--success')
        messageEle.classList.remove('message--error')
        iconEle.src = checkIcon
        iconEle.alt = 'success'
      } else if (status === 'error') {
        messageEle.classList.add('message--error')
        messageEle.classList.remove('message--success')
        iconEle.src = closeIcon
        iconEle.alt = 'error'
      }

      // Set the message content
      contentMessageEle.textContent = message

      // Show the message and hide it after 2 seconds
      messageEle.classList.add('show')
      setTimeout(() => {
        messageEle.classList.remove('show')
      }, 2000)
    }
  }
}

export default Notification
