class BaseInstance {
  constructor() {
    this.instance = this
  }

  /**
   * Singleton pattern to ensure only one instance of the derived class exists.
   * @returns {BaseInstance} The instance of the derived class.
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new this() // `this` refers to the derived class, e.g., `Main`
    }
    return this.instance
  }
}
export default BaseInstance
