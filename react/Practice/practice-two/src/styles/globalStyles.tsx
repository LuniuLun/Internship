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
      },

      '::-webkit-scrollbar': {
        width: '8px',
        height: '10px',
        backgroundColor: 'brand.secondary'
      },

      '::-webkit-scrollbar-thumb': {
        borderRadius: '10px',
        backgroundColor: 'brand.secondary'
      },

      '::-webkit-scrollbar-thumb:hover': {
        backgroundColor: 'brand.blackTextSecondary'
      },

      '::-webkit-scrollbar-track': {
        backgroundColor: 'brand.white',
        borderRadius: '10px'
      }
    })
  }
}

export default globalStyles
