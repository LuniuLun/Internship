class RegExp {
  constructor() {
    this.instance = this
    this.maxLen = 100
    this.minLen = 2
    this.specialChars = /[!@#$%^&*()+\-=[\]{};':"\\|,.<>/?]/
    this.alphanumeric = /^[a-zA-Z0-9\s]*$/
    this.imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp']
    this.realNumber = /^[0-9]*\.?[0-9]*$/
  }

  static getInstance() {
    if (!RegExp.instance) {
      RegExp.instance = new RegExp()
    }
    return RegExp.instance
  }
}
export default RegExp
