import React from 'react'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'

import { LOCALE_EN } from '../../../constants/locales'
import configureStore from '../../../configureStore'
import history from '../../../utils/history'
import Footer from '../index'

describe('<Footer />', () => {
  let store

  beforeAll(() => {
    store = configureStore({}, history)
  })

  it('should render and match the snapshot', () => {
    const renderedComponent = renderer
      .create(
        <Provider store={store}>
          <IntlProvider locale={LOCALE_EN}>
            <Footer />
          </IntlProvider>
        </Provider>,
      )
      .toJSON()

    expect(renderedComponent).toMatchSnapshot()
  })
})
