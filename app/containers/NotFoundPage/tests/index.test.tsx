/**
 * Testing the NotFoundPage
 */

import { render } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import NotFound from '../index'
import messages from '../messages'
import { DEFAULT_LOCALE } from '../../../constants/locales'

describe('<NotFound />', () => {
  it('should render the Page Not Found text', () => {
    const { queryByText } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <NotFound />
      </IntlProvider>,
    )
    expect(queryByText(messages.header.defaultMessage)).toBeInTheDocument()
  })
})
