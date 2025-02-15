import { render } from '@testing-library/react'
import React from 'react'

import { ListItemTitleStyled } from '../styled'

const renderComponent = (props = {}) => {
  const utils = render(<ListItemTitleStyled {...props} />)
  const element = utils.container.firstChild! as HTMLElement
  return { ...utils, element }
}

describe('<ListItemTitle />', () => {
  it('should render an <p> tag', () => {
    const { element } = renderComponent()
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('P')
  })

  it('should have a class attribute', () => {
    const { element } = renderComponent()
    expect(element).toHaveAttribute('class')
  })

  it('should adopt a valid attribute', () => {
    const id = 'test'
    const { element } = renderComponent({ id })
    expect(element).toHaveAttribute('id', id)
  })

  it('should not adopt an invalid attribute', () => {
    const { element } = renderComponent({ attribute: 'test' })
    expect(element).not.toHaveAttribute('attribute')
  })
})
