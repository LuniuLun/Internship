import HomePage from './events/home'
import Notification from './events/notification'

class Main {
  constructor() {
    this.instance = this
    this.homePage = HomePage.getInstance()
  }

  async init() {
    await this.homePage.create()
    Notification.renderNotification()
  }

  static getInstance() {
    if (!Main.instance) {
      Main.instance = new Main()
    }
    return Main.instance
  }
}

const main = Main.getInstance()
main.init()
