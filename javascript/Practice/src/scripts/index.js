import HomePage from './events/home'
import Notification from './events/notification'

class Main {
  constructor() {
    this.instance = this
  }

  static async init() {
    await HomePage.create()
    Notification.renderNotification()
  }

  static getInstance() {
    if (!Main.instance) {
      Main.instance = new Main()
    }
    return Main.instance
  }
}

Main.init()
