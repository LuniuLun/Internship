/* eslint-disable class-methods-use-this */
import checkIcon from '../../assets/icons/check.svg'
import closeIcon from '../../assets/icons/close.svg'
import MESSAGE from '../constants/message'
import getValidElements from './getValidElement'
import handleErrors from './handleError'

class Notification {
  private static instance: Notification
  private messageEle: HTMLElement | null

  private constructor() {
    this.messageEle = document.querySelector('.js-message')
  }

  public static getInstance(): Notification {
    if (!this.instance) {
      this.instance = new this()
    }

    return this.instance
  }

  renderNotification({ status = '', message = '' }) {
    if (status && message) {
      if (!this.messageEle) {
        this.messageEle = document.createElement('div')
        this.messageEle.classList.add('message', 'js-message')

        const iconEle = document.createElement('img')
        iconEle.classList.add('message__icon')
        iconEle.alt = 'status'

        const contentMessageEle = document.createElement('p')
        contentMessageEle.classList.add(
          'message__content',
          'js-message-content',
        )

        this.messageEle.appendChild(iconEle)
        this.messageEle.appendChild(contentMessageEle)

        document.body.appendChild(this.messageEle)
      }

      const contentMessageEle = getValidElements(
        this.messageEle.querySelector('.js-message-content'),
      )
      const iconEle = getValidElements(
        this.messageEle.querySelector('.message__icon'),
      )

      if (!contentMessageEle || !iconEle) return
      const iconElement = iconEle as HTMLImageElement

      // Set appropriate class and icon based on the status
      if (status === 'success') {
        this.messageEle.classList.add('message--success')
        this.messageEle.classList.remove('message--error')
        iconElement.src = checkIcon
        iconElement.alt = 'success'
      } else if (status === 'error') {
        this.messageEle.classList.add('message--error')
        this.messageEle.classList.remove('message--success')
        iconElement.src = closeIcon
        iconElement.alt = 'error'
      }

      // Set the message content
      contentMessageEle.textContent = message

      // Show the message and hide it after 3 seconds
      this.messageEle.classList.add('show')
      setTimeout(() => {
        this.messageEle?.classList.remove('show')
      }, 3000)
    }
  }
}

export default Notification
