import { debounce } from '@utils'

jest.useFakeTimers()

describe('debounce', () => {
  it('should debounce the function call', () => {
    const mockFn = jest.fn()
    const debouncedFn = debounce(mockFn, 500)

    debouncedFn('test1')
    debouncedFn('test2')
    debouncedFn('test3')

    expect(mockFn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(500)

    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith('test3')
  })

  it('should call the function with correct delay', () => {
    const mockFn = jest.fn()
    const debouncedFn = debounce(mockFn, 1000)

    debouncedFn('test')

    expect(mockFn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(1000)

    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith('test')
  })
})
