const globalStyles = {
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false
  },
  styles: {
    global: () => ({
      body: {
        fontFamily: "'Open Sans', sans-serif",
        color: 'brand.blackTextPrimary',
        bg: 'brand.whiteBg',
        // color: mode('brand.blackTextPrimary', 'brand.white')(props),
        // bg: mode('brand.whiteBg', 'brand.blackBg')(props),
        lineHeight: 'base'
      }
    })
  }
}
export default globalStyles
