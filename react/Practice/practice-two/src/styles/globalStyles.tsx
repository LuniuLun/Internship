const globalStyles = {
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false
  },
  fonts: {
    heading: 'Open Sans, sans-serif',
    body: 'Open Sans, sans-serif'
  },
  styles: {
    global: () => ({
      body: {
        color: 'brand.blackTextPrimary',
        bg: 'brand.whiteBg'
        // color: mode('brand.blackTextPrimary', 'brand.white')(props),
        // bg: mode('brand.whiteBg', 'brand.blackBg')(props),
      }
    })
  }
}
export default globalStyles
