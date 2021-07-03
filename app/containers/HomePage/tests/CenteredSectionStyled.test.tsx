import { render } from '@testing-library/react'
import React from 'react'

import { CurrencyBlockStyled, DisclaimerStyled } from '../styled'

const renderComponent = (Component: React.FC, props = {}) => {
  const utils = render(<Component {...props} />)
  const element = utils.container.firstChild! as HTMLElement
  return { ...utils, element }
}

describe('<CenteredSection />', () => {
  it('should render a <section> tag', () => {
    const { element: elementDisclaimer } = renderComponent(DisclaimerStyled)
    expect(elementDisclaimer).toBeInTheDocument()
    expect(elementDisclaimer.tagName).toEqual('SECTION')

    const { element: elementCurrencyBlock } = renderComponent(CurrencyBlockStyled)
    expect(elementCurrencyBlock).toBeInTheDocument()
    expect(elementCurrencyBlock.tagName).toEqual('SECTION')
  })

  it('should have a class attribute', () => {
    const { element: elementDisclaimer } = renderComponent(DisclaimerStyled)
    expect(elementDisclaimer).toHaveAttribute('class')

    const { element: elementCurrencyBlock } = renderComponent(CurrencyBlockStyled)
    expect(elementCurrencyBlock).toHaveAttribute('class')
  })

  it('should adopt a valid attribute', () => {
    const id = 'test'
    const { element: elementDisclaimer } = renderComponent(DisclaimerStyled, { id })
    expect(elementDisclaimer).toHaveAttribute('id', id)

    const { element: elementCurrencyBlock } = renderComponent(CurrencyBlockStyled, { id })
    expect(elementCurrencyBlock).toHaveAttribute('id', id)
  })

  it('should not adopt an invalid attribute', () => {
    const { element: elementDisclaimer } = renderComponent(DisclaimerStyled, { attribute: 'test' })
    expect(elementDisclaimer).not.toHaveAttribute('attribute')

    const { element: elementCurrencyBlock } = renderComponent(CurrencyBlockStyled, { attribute: 'test' })
    expect(elementCurrencyBlock).not.toHaveAttribute('attribute')
  })
})
