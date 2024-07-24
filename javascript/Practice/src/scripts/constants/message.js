class Message {
  constructor() {
    this.instance = this
    this.ADD_PRODUCT_SUCCESS = 'Add product successfully'
    this.ADD_PRODUCT_FAILED = 'Failed to add product'
    this.DELETE_PRODUCT_SUCCESS = 'Delete product successfully'
    this.DELETE_PRODUCT_FAILED = 'Failed to delete the product'
    this.EDIT_PRODUCT_SUCCESS = 'Update product successfully'
    this.EDIT_PRODUCT_FAILED = 'Failed to update the product'
    this.GET_PRODUCT_FAILED = 'Failed to load products!'
    this.NOT_FOUND = 'No Results Found!'
  }

  static getInstance() {
    if (!Message.instance) {
      Message.instance = new Message()
    }
    return Message.instance
  }
}

export default Message
