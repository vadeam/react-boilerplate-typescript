/**
 * Test the repo list item
 */

import { render, getByText } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import { LOCALE_EN } from 'constants/locales'

import RatesListItem, { RateItem } from '../index'

const renderComponent = (item: RateItem) =>
  render(
    <IntlProvider locale={LOCALE_EN}>
      <RatesListItem item={item} />
    </IntlProvider>,
  )

describe('<RepoListItem />', () => {
  let item: RateItem

  beforeEach(() => {
    item = { id: 'USD', currency: 'USD', rate: 1.2345 }
  })

  it('should render a ListItem', () => {
    const { container } = renderComponent(item)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render usernames that are not the current one', () => {
    const { container } = renderComponent(item)
    expect(getByText(container, (content) => content.startsWith(item.currency))).not.toBeNull()
  })

  it('should render the currency name and rate', () => {
    const { container } = renderComponent(item)

    const element = container.getElementsByClassName('currency-rate')

    expect(element.length).toEqual(1)
    expect(element.item(0)).not.toBeNull()
    // @ts-ignore
    expect(element.item(0).innerHTML).toEqual(`${item.currency}:&nbsp;&nbsp;${item.rate}`)
  })

  it('should render the li', () => {
    const { container } = renderComponent(item)
    expect(container.querySelector('li')).not.toBeNull()
  })
})
