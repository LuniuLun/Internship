import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import CustomModal from '@components/CustomModal'

describe('CustomModal', () => {
  const mockHandleSubmit = jest.fn()
  const mockOnClose = jest.fn()

  it('matches the snapshot when open', () => {
    const { asFragment } = render(
      <CustomModal isOpen={true} onClose={mockOnClose} handleSubmit={mockHandleSubmit} title='Test Modal'>
        <div>Test content</div>
      </CustomModal>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
