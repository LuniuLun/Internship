import REGEXP from '../constants/regExp'

export const restrictIntegerInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
  const charCode = event.charCode || event.which

  if (charCode < REGEXP.CHAR_CODE_0 || charCode > REGEXP.CHAR_CODE_9) {
    event.preventDefault()
  }
}
