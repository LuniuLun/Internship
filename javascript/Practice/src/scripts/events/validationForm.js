import RegExpClass from '../constants/regExp'

class ValidationForm {
  constructor() {
    this.instance = this
  }

  static getInstance() {
    if (!ValidationForm.instance) {
      ValidationForm.instance = new ValidationForm()
    }
    return ValidationForm.instance
  }

  static isNotEmpty(key, value) {
    return !value.trim().length ? `${key} is required.` : undefined
  }

  static checkLenOfString(key, value) {
    return value.trim().length < 2 || value.trim().length > 100
      ? `${key} must have between ${RegExpClass.getInstance().minLen} and ${RegExpClass.getInstance().maxLen} characters`
      : undefined
  }

  static isFloat(key, value) {
    const floatValue = parseFloat(value)
    return !Number.isNaN(floatValue)
      ? undefined
      : `${key} must be a real number`
  }

  static isInteger(key, value) {
    const numberValue = Number(value)
    return Number.isInteger(numberValue)
      ? undefined
      : `${key} must be a integer number`
  }

  static isWithSpecialChars(key, value) {
    return RegExpClass.getInstance().specialChars.test(value)
      ? undefined
      : `${key} must contain at least one special character (!@#$%^&*(),.?":{}|<>)`
  }

  static isValidString(key, value) {
    return RegExpClass.getInstance().alphanumeric.test(value)
      ? undefined
      : `${key} contains invalid characters. Only alphanumeric characters and spaces are allowed`
  }

  static isValidImageUrl(key, value) {
    const isValidExtension = RegExpClass.getInstance().imageExtensions.some(
      (ext) => value.endsWith(ext),
    )
    const isValidProtocol =
      value.startsWith('http://') || value.startsWith('https://')

    if (isValidProtocol || isValidExtension) {
      return undefined
    }

    return `${key} must be a valid image URL starting with http://, https:// or with extensions: ${RegExpClass.getInstance().imageExtensions.join(', ')}`
  }

  // static async isAliveImageUrl(key, value) {
  //   try {
  //     const response = await fetch(value, { method: 'HEAD' })
  //     if (!response.ok) {
  //       return `${key} URL does not point to a valid image resource`
  //     }
  //     return undefined
  //   } catch (error) {
  //     return `${key} URL does not point to a valid image resource`
  //   }
  // }

  static checkName(key, value) {
    return (
      ValidationForm.isNotEmpty(key, value) ||
      ValidationForm.checkLenOfString(key, value) ||
      ValidationForm.isValidString(key, value) ||
      true
    )
  }

  static checkQuantity(key, value) {
    return (
      ValidationForm.isNotEmpty(key, value) ||
      ValidationForm.isInteger(key, value) ||
      true
    )
  }

  static checkPrice(key, value) {
    return (
      ValidationForm.isNotEmpty(key, value) ||
      ValidationForm.isFloat(key, value) ||
      true
    )
  }

  static checkImageURL(key, value) {
    return (
      ValidationForm.isNotEmpty(key, value) ||
      ValidationForm.isValidImageUrl(key, value) ||
      // (ValidationForm.isAliveImageUrl(key, value)
      //   ? undefined
      //   : ValidationForm.isAliveImageUrl(key, value)) ||
      true
    )
  }
}

export default ValidationForm
