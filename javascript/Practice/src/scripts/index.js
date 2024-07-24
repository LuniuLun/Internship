import HomePage from './events/home'
import Foods from './products/foods'

class Main {
  constructor() {
    this.instance = this
    this.products = Foods.getInstance()
    this.homePage = HomePage.getInstance()
  }

  async init() {
    await this.products.renderProduct()
    HomePage.dropdownToggle()
    HomePage.showForm()
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
