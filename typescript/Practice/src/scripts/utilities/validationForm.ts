import REGEXP from '../constants/regExp'
import handleErrors from './handleError'

class ValidationForm {
  private static instance: ValidationForm

  private constructor() {}

  public static getInstance(): ValidationForm {
    if (!this.instance) {
      this.instance = new this()
    }
    return this.instance
  }

  static isNotEmpty(key: string, value: string): string | undefined {
    return !value.trim().length ? `Please fill in the ${key}.` : undefined
  }

  static checkLenOfString(key: string, value: string): string | undefined {
    const { length } = value.trim()
    return length < REGEXP.MIN_LEN || length > REGEXP.MAX_LEN
      ? `The ${key} should be between ${REGEXP.MIN_LEN} and ${REGEXP.MAX_LEN} characters.`
      : undefined
  }

  static isFloat(key: string, value: string): string | undefined {
    return REGEXP.REAL_NUMBER.test(value) &&
      (value.match(/\./g) || []).length <= 1
      ? undefined
      : `Please enter a valid number for ${key}.`
  }

  static isInteger(key: string, value: string): string | undefined {
    const numberValue = Number(value)
    return Number.isInteger(numberValue)
      ? undefined
      : `The ${key} should be a whole number.`
  }

  static isGreaterThanZero(key: string, value: string): string | undefined {
    const numValue = parseFloat(value)
    return numValue <= 0
      ? `The ${key} should be a number greater than 0.`
      : undefined
  }

  static isWithSpecialChars(key: string, value: string): string | undefined {
    return REGEXP.SPECIAL_CHARS.test(value)
      ? undefined
      : `The ${key} should contain at least one special character (!@#$%^&*(),.?":{}|<>).`
  }

  static isValidString(key: string, value: string): string | undefined {
    return REGEXP.ALPHANUMERIC.test(value)
      ? undefined
      : `The ${key} don't contains invalid characters. Only letters, numbers, and spaces are allowed.`
  }

  static async isValidImageUrl(
    key: string,
    value: string,
  ): Promise<string | undefined> {
    if (!value.startsWith('http://') && !value.startsWith('https://')) {
      return `The ${key} must start with http:// or https://.`
    }
    try {
      const response = await fetch(value, { method: 'HEAD' })

      if (!response.ok) {
        return `The ${key} does not point to a valid image resource.`
      }

      const contentType = handleErrors(() =>
        response.headers.get('Content-Type'),
      )
      if (!contentType) return
      const allowedExtensions = REGEXP.IMAGE_EXTENSIONS

      if (!allowedExtensions.some((ext) => contentType.includes(ext))) {
        return `The ${key} must be a valid image resource. Allowed types are: ${allowedExtensions.join(', ')}.`
      }

      return undefined
    } catch (error) {
      return `The ${key} does not point to a valid image resource.`
    }
  }

  static checkName(key: string, value: string): string | false {
    return (
      this.isNotEmpty(key, value) ||
      this.checkLenOfString(key, value) ||
      this.isValidString(key, value) ||
      false
    )
  }

  static checkQuantity(key: string, value: string): string | false {
    return (
      this.isNotEmpty(key, value) ||
      this.isInteger(key, value) ||
      this.isGreaterThanZero(key, value) ||
      false
    )
  }

  static checkPrice(key: string, value: string): string | false {
    return (
      this.isNotEmpty(key, value) ||
      this.isFloat(key, value) ||
      this.isGreaterThanZero(key, value) ||
      false
    )
  }

  static async checkImageURL(
    key: string,
    value: string,
  ): Promise<string | false> {
    return (
      this.isNotEmpty(key, value) ||
      (await this.isValidImageUrl(key, value)) ||
      false
    )
  }
}

export default ValidationForm
