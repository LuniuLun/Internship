import REGEXP from '../constants/regExp'
import BaseInstance from './baseInstance'

class ValidationForm extends BaseInstance {
  /**
   * Checks if a value is not empty.
   * @param {string} key - The name of the field.
   * @param {string} value - The value to check.
   * @returns {string|undefined} An error message if the value is empty, otherwise undefined.
   */
  static isNotEmpty(key, value) {
    return !value.trim().length ? `Please fill in the ${key}.` : undefined
  }

  /**
   * Checks if a string's length is between 2 and 100 characters.
   * @param {string} key - The name of the field.
   * @param {string} value - The value to check.
   * @returns {string|undefined} An error message if the string length is out of range, otherwise undefined.
   */
  static checkLenOfString(key, value) {
    const { length } = value.trim()
    return length < REGEXP.MIN_LEN || length > REGEXP.MAX_LEN
      ? `The ${key} should be between ${REGEXP.MIN_LEN} and ${REGEXP.MAX_LEN} characters.`
      : undefined
  }

  /**
   * Checks if a value is a valid floating-point number.
   * @param {string} key - The name of the field.
   * @param {string} value - The value to check.
   * @returns {string|undefined} An error message if the value is not a float, otherwise undefined.
   */
  static isFloat(key, value) {
    return REGEXP.REAL_NUMBER.test(value) &&
      (value.match(/\./g) || []).length <= 1
      ? undefined
      : `Please enter a valid number for ${key}.`
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
      : `The ${key} should be a whole number.`
  }

  /**
   * Checks if a value is a number greater than 0.
   * @param {string} key - The name of the field.
   * @param {string} value - The value to check.
   * @returns {string|undefined} An error message if the value is not greater than 0, otherwise undefined.
   */
  static isGreaterThanZero(key, value) {
    const numValue = parseFloat(value)
    if (numValue <= 0) {
      return `The ${key} should be a number greater than 0.`
    }
    return undefined
  }

  /**
   * Checks if a string contains at least one special character.
   * @param {string} key - The name of the field.
   * @param {string} value - The value to check.
   * @returns {string|undefined} An error message if the value does not contain a special character, otherwise undefined.
   */
  static isWithSpecialChars(key, value) {
    return REGEXP.SPECIAL_CHARS.test(value)
      ? undefined
      : `The ${key} should contain at least one special character (!@#$%^&*(),.?":{}|<>).`
  }

  /**
   * Checks if a string contains only valid characters (alphanumeric and spaces).
   * @param {string} key - The name of the field.
   * @param {string} value - The value to check.
   * @returns {string|undefined} An error message if the value contains invalid characters, otherwise undefined.
   */
  static isValidString(key, value) {
    return REGEXP.ALPHANUMERIC.test(value)
      ? undefined
      : `The ${key} don't contains invalid characters. Only letters, numbers, and spaces are allowed.`
  }

  /**
   * Checks if a URL points to a valid image resource.
   * @param {string} key - The name of the field.
   * @param {string} value - The URL to check.
   * @returns {Promise<string|undefined>} An error message if the URL is not valid, otherwise undefined.
   */
  static async isValidImageUrl(key, value) {
    if (!value.startsWith('http://') && !value.startsWith('https://')) {
      return `The ${key} must start with http:// or https://.`
    }
    try {
      const response = await fetch(value, { method: 'HEAD' })

      if (!response.ok) {
        return `The ${key} does not point to a valid image resource.`
      }

      const contentType = response.headers.get('Content-Type')
      const allowedExtensions = REGEXP.IMAGE_EXTENSIONS

      if (!allowedExtensions.some((ext) => contentType.includes(ext))) {
        return `The ${key} must be a valid image resource. Allowed types are: ${allowedExtensions.join(', ')}.`
      }

      return undefined
    } catch (error) {
      return `The ${key} does not point to a valid image resource.`
    }
  }

  /**
   * Validates the name field.
   * @param {string} key - The name of the field.
   * @param {string} value - The value to check.
   * @returns {string|false} An error message if validation fails, otherwise true.
   */
  static checkName(key, value) {
    return (
      this.isNotEmpty(key, value) ||
      this.checkLenOfString(key, value) ||
      this.isValidString(key, value) ||
      false
    )
  }

  /**
   * Validates the quantity field.
   * @param {string} key - The name of the field.
   * @param {string} value - The value to check.
   * @returns {string|false} An error message if validation fails, otherwise true.
   */
  static checkQuantity(key, value) {
    return (
      this.isNotEmpty(key, value) ||
      this.isInteger(key, value) ||
      this.isGreaterThanZero(key, value) ||
      false
    )
  }

  /**
   * Validates the price field.
   * @param {string} key - The name of the field.
   * @param {string} value - The value to check.
   * @returns {string|false} An error message if validation fails, otherwise true.
   */
  static checkPrice(key, value) {
    return (
      this.isNotEmpty(key, value) ||
      this.isFloat(key, value) ||
      this.isGreaterThanZero(key, value) ||
      false
    )
  }

  /**
   * Validates the image URL field.
   * @param {string} key - The name of the field.
   * @param {string} value - The value to check.
   * @returns {string|false} An error message if validation fails, otherwise true.
   */
  static async checkImageURL(key, value) {
    return (
      this.isNotEmpty(key, value) ||
      (await this.isValidImageUrl(key, value)) ||
      false
    )
  }
}

export default ValidationForm
