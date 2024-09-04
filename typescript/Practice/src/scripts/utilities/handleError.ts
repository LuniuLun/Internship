// Todo: Add more specific error handling based on the error type or context if needed.
function handleErrors<T>(callback: () => T): T | null {
  try {
    return callback()
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message)
    } else {
      console.error('Unknown error occurred')
    }
    return null
  }
}

export default handleErrors
