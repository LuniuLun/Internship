import dotenv from 'dotenv'
import HomePage from './events/home'

dotenv.config()
class Main {
  private static instance: Main
  homePage: HomePage

  private constructor() {
    this.homePage = HomePage.getInstance()
  }

  public static getInstance(): Main {
    if (!this.instance) {
      this.instance = new this()
    }
    return this.instance
  }
  async init() {
    await this.homePage.create()
  }
}

const main = Main.getInstance()
main.init()
