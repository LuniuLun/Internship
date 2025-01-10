import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import WarningModal from '@components/WarningModal'

describe('WarningModal', () => {
  const renderWarningModal = (isOpen = true, title = 'Warning', message = 'Are you sure?') => {
    return render(
      <WarningModal isModalOpen={isOpen} onClose={() => {}} title={title} message={message} handleSubmit={() => {}} />
    )
  }

  it('matches snapshot when modal is open', () => {
    const { asFragment } = renderWarningModal()
    expect(asFragment()).toMatchSnapshot()
  })
})
