/* eslint-disable class-methods-use-this */
import BaseInstance from './baseInstance'
import checkIcon from '../../assets/icons/check.svg'
import closeIcon from '../../assets/icons/close.svg'

class Notification extends BaseInstance {
  constructor() {
    super()
    this.messageEle = document.querySelector('.js-message')
  }

  /**
   * Renders a notification with the provided message and status.
   * @param {Object} options - The options for the notification.
   * @param {string} options.status - The status of the notification ('ok' or 'error').
   * @param {string} options.message - The message to display.
   */
  renderNotification({ status = '', message = '' }) {
    if (message) {
      const contentMessageEle = this.messageEle.querySelector(
        '.js-message-content',
      )
      const iconEle = this.messageEle.querySelector('.message__icon')

      // Set appropriate class and icon based on the status
      if (status === 'success') {
        this.messageEle.classList.add('message--success')
        this.messageEle.classList.remove('message--error')
        iconEle.src = checkIcon
        iconEle.alt = 'success'
      } else if (status === 'error') {
        this.messageEle.classList.add('message--error')
        this.messageEle.classList.remove('message--success')
        iconEle.src = closeIcon
        iconEle.alt = 'error'
      }

      // Set the message content
      contentMessageEle.textContent = message

      // Show the message and hide it after 2 seconds
      this.messageEle.classList.add('show')
      setTimeout(() => {
        this.messageEle.classList.remove('show')
      }, 3000)
    }
  }
}

export default Notification
