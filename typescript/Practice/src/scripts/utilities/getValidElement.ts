// Todo: Consider adding additional checks for specific types of elements if needed.
function getValidElements<T>(elements: T | null): T {
  if (!elements) throw Error('Not found element')

  return elements
}

export default getValidElements
