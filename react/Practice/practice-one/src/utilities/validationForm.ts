import REGEXP from '../constants/regExp'

export const isNotEmpty = (key: string, value: string): string | undefined => {
  return !value.trim().length ? `Please fill in the ${key}.` : undefined
}

export const checkLenOfString = (key: string, value: string): string | undefined => {
  const { length } = value.trim()
  return length < REGEXP.MIN_LEN || length > REGEXP.MAX_LEN
    ? `${key} should be between ${REGEXP.MIN_LEN} and ${REGEXP.MAX_LEN} characters.`
    : undefined
}

export const isFloat = (key: string, value: string): string | undefined => {
  return REGEXP.REAL_NUMBER.test(value) && (value.match(/\./g) || []).length <= 1
    ? undefined
    : `Please enter a valid number for ${key}.`
}

export const isInteger = (key: string, value: string): string | undefined => {
  const numberValue = Number(value)
  return Number.isInteger(numberValue) ? undefined : `${key} should be a whole number.`
}

export const isGreaterThanZero = (key: string, value: string): string | undefined => {
  const numValue = parseFloat(value)
  return numValue <= 0 ? `${key} should be a number greater than 0.` : undefined
}

export const isWithSpecialChars = (key: string, value: string): string | undefined => {
  return REGEXP.SPECIAL_CHARS.test(value)
    ? undefined
    : `${key} should contain at least one special character (!@#$%^&*(),.?":{}|<>).`
}

export const isValidString = (key: string, value: string): string | undefined => {
  return REGEXP.ALPHANUMERIC.test(value)
    ? undefined
    : `${key} shouldn't contain invalid characters. Only letters, numbers, and spaces are allowed.`
}

export const isValidImageUrl = async (key: string, value: string): Promise<string | undefined> => {
  if (!value.startsWith('http://') && !value.startsWith('https://')) {
    return `${key} must start with http:// or https://.`
  }

  try {
    const response = await fetch(value, { method: 'HEAD' })
    if (!response.ok) {
      return `${key} does not point to a valid image resource.`
    }

    const contentType = response.headers.get('Content-Type')
    if (!contentType) return
    const allowedExtensions = REGEXP.IMAGE_EXTENSIONS

    if (!allowedExtensions.some((ext) => contentType.includes(ext))) {
      return `${key} must be a valid image resource. Allowed types are: ${allowedExtensions.join(', ')}.`
    }

    return undefined
  } catch (error: unknown) {
    return `${key} does not point to a valid image resource. ${error instanceof Error ? error.message : 'Unknown error occurred'}`
  }
}

export const checkName = (key: string, value: string): string | false => {
  return isNotEmpty(key, value) || checkLenOfString(key, value) || isValidString(key, value) || false
}

export const checkQuantity = (key: string, value: string): string | false => {
  return isNotEmpty(key, value) || isInteger(key, value) || isGreaterThanZero(key, value) || false
}

export const checkPrice = (key: string, value: string): string | false => {
  return isNotEmpty(key, value) || isFloat(key, value) || isGreaterThanZero(key, value) || false
}

export const checkImageURL = async (key: string, value: string): Promise<string | false> => {
  return isNotEmpty(key, value) || (await isValidImageUrl(key, value)) || false
}
