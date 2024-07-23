import HomePage from './events/homepage'
import Foods from './products/foods'

class Main {
  constructor() {
    this.instance = this
    this.products = Foods.getInstance()
    this.homePage = HomePage.getInstance()
  }

  init() {
    this.products.renderProduct()
    HomePage.dropdownToggle()
    HomePage.getForm()
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
