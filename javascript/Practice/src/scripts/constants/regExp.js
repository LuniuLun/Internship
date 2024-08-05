const RegExp = (function regExp() {
  let regExpInstance

  function create() {
    return {
      maxLen: 100,
      minLen: 2,
      specialChars: /[!@#$%^&*()+\-=[\]{};':"\\|,.<>/?]/,
      alphanumeric: /^[a-zA-Z0-9\s]*$/,
      imageExtensions: ['jpg', 'jpeg', 'png', 'gif', 'bmp'],
      realNumber: /^[0-9]*\.?[0-9]*$/,
    }
  }

  return {
    getInstance() {
      if (!regExpInstance) {
        regExpInstance = create()
      }
      return regExpInstance
    },
  }
})()

export default RegExp
