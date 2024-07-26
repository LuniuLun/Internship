import HomePage from './events/home'
import Product from './objects/product'
import Notification from './utilities/notification'

class Main {
  constructor() {
    this.instance = this
    this.products = Product.getInstance()
    this.homePage = HomePage.getInstance()
  }

  async init() {
    await this.homePage.renderProduct()
    HomePage.dropdownToggle()
    HomePage.showForm()
    HomePage.showPopup()
    HomePage.filterProduct()
    HomePage.getMoreProduct()
    this.homePage.showEditForm()
    Notification.renderNotification()
  }

  static getInstance() {
    if (!Main.instance) {
      Main.instance = new Main()
    }
    return Main.instance
  }
}

const instance = Main.getInstance()
instance.init()
