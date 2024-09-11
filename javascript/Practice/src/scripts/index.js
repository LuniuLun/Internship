import dotenv from 'dotenv'
import HomePage from './events/home'
import BaseInstance from './utilities/baseInstance'

dotenv.config()
class Main extends BaseInstance {
  constructor() {
    super()
    this.homePage = HomePage.getInstance()
  }

  async init() {
    await this.homePage.create()
  }
}

const main = Main.getInstance()
main.init()
