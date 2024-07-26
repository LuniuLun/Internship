import RegExpClass from '../constants/regExp'

class ValidationForm {
  constructor() {
    this.instance = this
  }

  /**
   * Singleton pattern to ensure only one instance of ValidationForm exists.
   * @returns {ValidationForm} The instance of the ValidationForm class.
   */
  static getInstance() {
    if (!ValidationForm.instance) {
      ValidationForm.instance = new ValidationForm()
    }
    return ValidationForm.instance
  }

  /**
   * Checks if a value is not empty.
   * @param {string} key - The name of the field.
   * @param {string} value - The value to check.
   * @returns {string|undefined} An error message if the value is empty, otherwise undefined.
   */
  static isNotEmpty(key, value) {
    return !value.trim().length ? `${key} is required.` : undefined
  }

  /**
   * Checks if a string's length is between 2 and 100 characters.
   * @param {string} key - The name of the field.
   * @param {string} value - The value to check.
   * @returns {string|undefined} An error message if the string length is out of range, otherwise undefined.
   */
  static checkLenOfString(key, value) {
    return value.trim().length < 2 || value.trim().length > 100
      ? `${key} must have between ${RegExpClass.getInstance().minLen} and ${RegExpClass.getInstance().maxLen} characters`
      : undefined
  }

  /**
   * Checks if a value is a valid floating-point number.
   * @param {string} key - The name of the field.
   * @param {string} value - The value to check.
   * @returns {string|undefined} An error message if the value is not a float, otherwise undefined.
   */
  static isFloat(key, value) {
    const floatValue = parseFloat(value)
    return !Number.isNaN(floatValue)
      ? undefined
      : `${key} must be a real number`
  }

  /**
   * Checks if a value is a valid integer.
   * @param {string} key - The name of the field.
   * @param {string} value - The value to check.
   * @returns {string|undefined} An error message if the value is not an integer, otherwise undefined.
   */
  static isInteger(key, value) {
    const numberValue = Number(value)
    return Number.isInteger(numberValue)
      ? undefined
      : `${key} must be an integer number`
  }

  /**
   * Checks if a string contains at least one special character.
   * @param {string} key - The name of the field.
   * @param {string} value - The value to check.
   * @returns {string|undefined} An error message if the value does not contain a special character, otherwise undefined.
   */
  static isWithSpecialChars(key, value) {
    return RegExpClass.getInstance().specialChars.test(value)
      ? undefined
      : `${key} must contain at least one special character (!@#$%^&*(),.?":{}|<>)`
  }

  /**
   * Checks if a string contains only valid characters (alphanumeric and spaces).
   * @param {string} key - The name of the field.
   * @param {string} value - The value to check.
   * @returns {string|undefined} An error message if the value contains invalid characters, otherwise undefined.
   */
  static isValidString(key, value) {
    return RegExpClass.getInstance().alphanumeric.test(value)
      ? undefined
      : `${key} contains invalid characters. Only alphanumeric characters and spaces are allowed`
  }

  /**
   * Checks if a value is a valid image URL.
   * @param {string} key - The name of the field.
   * @param {string} value - The value to check.
   * @returns {string|undefined} An error message if the value is not a valid image URL, otherwise undefined.
   */
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

  /**
   * Validates the name field.
   * @param {string} key - The name of the field.
   * @param {string} value - The value to check.
   * @returns {string|true} An error message if validation fails, otherwise true.
   */
  static checkName(key, value) {
    return (
      ValidationForm.isNotEmpty(key, value) ||
      ValidationForm.checkLenOfString(key, value) ||
      ValidationForm.isValidString(key, value) ||
      true
    )
  }

  /**
   * Validates the quantity field.
   * @param {string} key - The name of the field.
   * @param {string} value - The value to check.
   * @returns {string|true} An error message if validation fails, otherwise true.
   */
  static checkQuantity(key, value) {
    return (
      ValidationForm.isNotEmpty(key, value) ||
      ValidationForm.isInteger(key, value) ||
      true
    )
  }

  /**
   * Validates the price field.
   * @param {string} key - The name of the field.
   * @param {string} value - The value to check.
   * @returns {string|true} An error message if validation fails, otherwise true.
   */
  static checkPrice(key, value) {
    return (
      ValidationForm.isNotEmpty(key, value) ||
      ValidationForm.isFloat(key, value) ||
      true
    )
  }

  /**
   * Validates the image URL field.
   * @param {string} key - The name of the field.
   * @param {string} value - The value to check.
   * @returns {string|true} An error message if validation fails, otherwise true.
   */
  static checkImageURL(key, value) {
    return (
      ValidationForm.isNotEmpty(key, value) ||
      ValidationForm.isValidImageUrl(key, value) ||
      true
    )
  }
}

export default ValidationForm
