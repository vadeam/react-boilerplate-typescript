import { render } from '@testing-library/react'
import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import { Provider } from 'react-redux'

import { LOCALE_EN } from 'constants/locales'

import configureStore from '../../../configureStore'
import history from '../../../utils/history'
import LanguageProvider from '../index'

const messages = defineMessages({
  someMessage: {
    id: 'some.id',
    defaultMessage: 'This is some default message',
    [LOCALE_EN]: `This is some '${LOCALE_EN}' message`,
  },
})

describe('<LanguageProvider />', () => {
  let store

  beforeEach(() => {
    store = configureStore({}, history)
  })

  it('should render its children', () => {
    const text = 'Test'
    const children = <h1>{text}</h1>
    const { queryByText } = render(
      <Provider store={store}>
        <LanguageProvider>{children}</LanguageProvider>
      </Provider>,
    )
    expect(queryByText(text)).toBeInTheDocument()
  })

  it('should render the default language messages', () => {
    const { queryByText } = render(
      <Provider store={store}>
        <LanguageProvider>
          <FormattedMessage {...messages.someMessage} />
        </LanguageProvider>
      </Provider>,
    )
    expect(queryByText(messages.someMessage.defaultMessage)).toBeInTheDocument()
  })
})
