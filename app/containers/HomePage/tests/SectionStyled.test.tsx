import { render } from '@testing-library/react'
import React from 'react'

import { SectionStyled, SectionStyledProps } from '../styled'

const renderComponent = (props?: SectionStyledProps) => {
  const utils = render(<SectionStyled {...props} />)
  const element = utils.container.firstChild! as HTMLElement
  return { ...utils, element }
}

describe('<Section />', () => {
  it('should render a <section> tag', () => {
    const { element } = renderComponent()
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('SECTION')
  })

  it('should have a class attribute', () => {
    const { element } = renderComponent()
    expect(element).toHaveAttribute('class')
  })

  it('should adopt a valid attribute', () => {
    const width = 'test'
    const { element } = renderComponent({ width })
    expect(element).toHaveAttribute('width', width)
  })

  it('should not adopt an invalid attribute', () => {
    const { element } = renderComponent({ width: '50%' })
    expect(element).not.toHaveAttribute('attribute')
  })
})
