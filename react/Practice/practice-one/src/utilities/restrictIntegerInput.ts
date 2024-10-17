import REGEXP from '../constants/regExp'

export const restrictIntegerInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
  const charCode = event.charCode || event.which
  const { key, ctrlKey, metaKey } = event

  if (
    key === 'Backspace' ||
    key === 'Delete' ||
    key === 'ArrowLeft' ||
    key === 'ArrowRight' ||
    key === 'Tab' ||
    ctrlKey ||
    metaKey
  ) {
    return
  }

  if (charCode < REGEXP.CHAR_CODE_0 || charCode > REGEXP.CHAR_CODE_9) {
    event.preventDefault()
  }
}