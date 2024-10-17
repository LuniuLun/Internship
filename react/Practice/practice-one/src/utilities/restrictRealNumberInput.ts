import REGEXP from '../constants/regExp'

export const restrictRealNumberInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
  const { key, target } = event
  const inputValue = (target as HTMLInputElement).value

  if (key === '.' && (inputValue.includes('.') || event.currentTarget.selectionStart === 0)) {
    event.preventDefault()
  } else if ((key.charCodeAt(0) < REGEXP.CHAR_CODE_0 || key.charCodeAt(0) > REGEXP.CHAR_CODE_9) && key !== '.') {
    event.preventDefault()
  }
}
