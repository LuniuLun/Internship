import debounce from '.'

jest.useFakeTimers()

describe('debounce', () => {
  test('should call function after specified delay', () => {
    const mockFn = jest.fn()
    const debouncedFn = debounce(mockFn, 1000)

    debouncedFn()
    debouncedFn()
    debouncedFn()

    expect(mockFn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(1000)

    expect(mockFn).toHaveBeenCalledTimes(1)
  })
})
