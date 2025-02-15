import { render } from '@testing-library/react'
import React from 'react'

import Wrapper from '../Wrapper'

describe('<Wrapper />', () => {
  it('should render an <li> tag', () => {
    const { container } = render(<Wrapper />)
    const element = container.querySelector('li')!
    expect(element).not.toBeNull()
  })

  it('should have a class attribute', () => {
    const { container } = render(<Wrapper />)
    const element = container.querySelector('li')!
    expect(element.hasAttribute('class')).toBe(true)
  })

  it('should adopt a valid attribute', () => {
    const id = 'test'
    const { container } = render(<Wrapper id={id} />)
    const element = container.querySelector('li')!
    expect(element.hasAttribute('id')).toBe(true)
    expect(element.id).toEqual(id)
  })

  it('should not adopt an invalid attribute', () => {
    const InvalidWrapper = Wrapper as any
    const { container } = render(<InvalidWrapper attribute="test" />)
    const element = container.querySelector('li')!
    expect(element.hasAttribute('attribute')).toBe(false)
  })
})
