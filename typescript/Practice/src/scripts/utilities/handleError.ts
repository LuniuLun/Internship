import MESSAGE from '../constants/message'
import Notification from './notification'

// Todo: Add more specific error handling based on the error type or context if needed.
function handleErrors<T>(callback: () => T): T | null {
  const notificationInstance = Notification.getInstance()
  try {
    return callback()
  } catch (error: unknown) {
    if (error instanceof Error) {
      notificationInstance.renderNotification({
        status: 'error',
        message: MESSAGE.ERROR_EVENT,
      })
      console.error(error)
    } else {
      notificationInstance.renderNotification({
        status: 'error',
        message: MESSAGE.UNKNOWN_ERROR,
      })
      console.error('Unknown error occurred')
    }
    return null
  }
}

export default handleErrors
