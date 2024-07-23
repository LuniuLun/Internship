import HomePage from './events/homepage'
import Products from './products/products'

class Main {
  constructor() {
    this.instance = this
  }

  static init() {
    const products = Products.getInstance()
    HomePage.dropdownToggle()
    HomePage.getForm()
    products.renderProduct()
  }

  static getInstance() {
    if (!Main.instance) {
      Main.instance = new Main()
    }
    return Main.instance
  }
}

Main.init()
