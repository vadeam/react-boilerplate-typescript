import { render } from '@testing-library/react'
import React from 'react'

import { WrapperStyled } from '../styled'

const renderComponent = (props = {}) => {
  const utils = render(<WrapperStyled {...props} />)
  const wrapper = utils.container.firstChild! as HTMLElement
  return { ...utils, wrapper }
}

describe('<WrapperStyled />', () => {
  it('should render a <div> tag', () => {
    const { wrapper } = renderComponent()
    expect(wrapper).toBeInTheDocument()
    expect(wrapper.tagName).toEqual('DIV')
  })

  it('should have a class attribute', () => {
    const { wrapper } = renderComponent()
    expect(wrapper).toHaveAttribute('class')
  })

  it('should adopt a valid attribute', () => {
    const id = 'test'
    const { wrapper } = renderComponent({ id })
    expect(wrapper).toHaveAttribute('id', id)
  })

  it('should not adopt an invalid attribute', () => {
    const { wrapper } = renderComponent({ attribute: 'test' })
    expect(wrapper).not.toHaveAttribute('attribute')
  })
})
