const Api = (function api() {
  let apiInstance

  function create() {
    return {
      getBaseUrl() {
        return process.env.PARCEL_REACT_APP_BASE_URL || ''
      },
      getProductsEndpoint() {
        return process.env.PARCEL_REACT_APP_PRODUCTS_ENDPOINT || ''
      },
    }
  }

  return {
    getInstance() {
      if (!apiInstance) {
        apiInstance = create()
      }
      return apiInstance
    },
  }
})()

export default Api
