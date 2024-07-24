import Message from '../constants/message'

class Notification {
  constructor() {
    this.instance = this
    this.message = Message.getInstance()
  }

  static getInstance() {
    if (!Message.instance) {
      Message.instance = new Message()
    }
    return Message.instance
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
