import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import ModulePermission from '.'

describe('ModulePermission Component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<ModulePermission />)
    expect(asFragment()).toMatchSnapshot()
  })
})
