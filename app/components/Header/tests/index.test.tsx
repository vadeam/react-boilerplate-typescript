import { render } from '@testing-library/react'
import { ConnectedRouter } from 'connected-react-router'
import { createMemoryHistory } from 'history'
import React from 'react'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'

import configureStore from '../../../configureStore'
import Header from '../index'
import { DEFAULT_LOCALE } from '../../../constants/locales'

describe('<Header />', () => {
  const history = createMemoryHistory()
  const store = configureStore({}, history)

  it('should render a div', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <ConnectedRouter history={history}>
            <Header />
          </ConnectedRouter>
        </IntlProvider>
      </Provider>,
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
