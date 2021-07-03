/**
 * Test the HomePage
 */

import { render, cleanup, fireEvent } from '@testing-library/react'
import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'

import { actions } from 'containers/App/redux'

import configureStore from '../../../configureStore'
import history from '../../../utils/history'
import HomePage from '../index'
import { INITIAL_STATE } from '../redux'
import { DEFAULT_LOCALE } from '../../../constants/locales'

const renderHomePage = (store) =>
  render(
    <Provider store={store}>
      <IntlProvider locale={DEFAULT_LOCALE}>
        <HelmetProvider>
          <HomePage />
        </HelmetProvider>
      </IntlProvider>
    </Provider>,
  )

describe('<HomePage />', () => {
  let store
  const mockedLoadRepos = jest.spyOn(actions, 'loadRepos').mockImplementation(() => ({ type: '' } as any))

  beforeEach(() => {
    store = configureStore({}, history)
    mockedLoadRepos.mockClear()
  })

  afterEach(cleanup)

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = renderHomePage(store)
    expect(firstChild).toMatchSnapshot()
  })

  it('shouldn`t fetch repos on mount (if username is empty)', () => {
    renderHomePage(store)
    expect(INITIAL_STATE.toJS().username).toBe('')
    expect(mockedLoadRepos).not.toHaveBeenCalled()
  })

  it('shouldn`t fetch repos if the form is submitted when the username is empty', () => {
    const { container } = renderHomePage(store)

    const form = container.querySelector('form')!
    fireEvent.submit(form)

    expect(mockedLoadRepos).not.toHaveBeenCalled()
  })

  it('should fetch repos if the form is submitted when the username isn`t empty', () => {
    const { container } = renderHomePage(store)
    const input = container.querySelector('input')!

    fireEvent.change(input, { target: { value: '' } })
    expect(mockedLoadRepos).not.toHaveBeenCalled()

    fireEvent.change(input, { target: { value: 'julienben' } })
    expect(mockedLoadRepos).not.toHaveBeenCalled()

    const form = container.querySelector('form')!

    fireEvent.submit(form)
    expect(mockedLoadRepos).toHaveBeenCalledTimes(1)
  })
})
