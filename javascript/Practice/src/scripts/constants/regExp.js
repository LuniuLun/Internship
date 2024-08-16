const REGEXP = {
  MAX_LEN: 100,
  MIN_LEN: 2,
  SPECIAL_CHARS: /[!@#$%^&*()+\-=[\]{};':"\\|,.<>/?]/,
  ALPHANUMERIC: /^[a-zA-Z0-9\s]*$/,
  IMAGE_EXTENSIONS: ['jpg', 'jpeg', 'png', 'gif', 'bmp'],
  REAL_NUMBER: /^-?[0-9]*\.?[0-9]+$/,
  CHAR_CODE_DOT: 46,
  CHAR_CODE_0: 48,
  CHAR_CODE_9: 57,
}

export default REGEXP
