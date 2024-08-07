import dotenv from 'dotenv'
import HomePage from './events/home'

dotenv.config()
class Main {
  constructor() {
    this.instance = this
    this.homePage = HomePage.getInstance()
  }

  async init() {
    await this.homePage.create()
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Main()
    }
    return this.instance
  }
}

const main = Main.getInstance()
main.init()
