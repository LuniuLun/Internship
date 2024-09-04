/* eslint-disable class-methods-use-this */
import checkIcon from '../../assets/icons/check.svg'
import closeIcon from '../../assets/icons/close.svg'
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
    this.messageEle = handleErrors(() => getValidElements(this.messageEle))
    if (!this.messageEle) return

    const contentMessageEle = handleErrors(() =>
      getValidElements(this.messageEle!.querySelector('.js-message-content')),
    )
    const iconEle = handleErrors(() =>
      getValidElements(
        this.messageEle!.querySelector('.message__icon') as HTMLImageElement,
      ),
    )
    if (!contentMessageEle || !iconEle) return

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

    // Show the message and hide it after 3 seconds
    this.messageEle.classList.add('show')
    setTimeout(() => {
      this.messageEle?.classList.remove('show')
    }, 3000)
  }
}

export default Notification
