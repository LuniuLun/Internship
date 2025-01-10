import { useToast } from '@chakra-ui/react'
import { act, renderHook } from '@testing-library/react'
import useCustomToast from '.'

jest.mock('@chakra-ui/react', () => ({
  useToast: jest.fn()
}))

describe('useCustomToast', () => {
  it('should call useToast with correct parameters', () => {
    const showToast = jest.fn()
    ;(useToast as jest.Mock).mockReturnValue(showToast)

    const { result } = renderHook(() => useCustomToast())

    act(() => {
      result.current.showToast({ status: 'success', position: 'top', description: 'Test message' })
    })

    expect(showToast).toHaveBeenCalledWith({
      status: 'success',
      position: 'top',
      isClosable: true,
      variant: 'successCustom',
      description: 'Test message'
    })
  })

  it('should call useToast with default position when not provided', () => {
    const showToast = jest.fn()
    ;(useToast as jest.Mock).mockReturnValue(showToast) // Return the mock function as the result of useToast

    const { result } = renderHook(() => useCustomToast())

    act(() => {
      result.current.showToast({ status: 'error', description: 'Error message' })
    })

    expect(showToast).toHaveBeenCalledWith({
      status: 'error',
      position: 'bottom',
      isClosable: true,
      variant: 'errorCustom',
      description: 'Error message'
    })
  })
})
