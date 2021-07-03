import { render, act } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'

import { DEFAULT_BASE_CURRENCY } from 'constants/franfurter'
import fetcher from 'utils/fetcher'
import history from 'utils/history'
import { AppStateRecord } from 'containers/App/types'
import { REDUCER_KEY_APP } from 'constants/reducers'
import { DEFAULT_LOCALE } from 'constants/locales'

import configureStore from '../../../configureStore'
import RatesList from '../index'

jest.mock('utils/fetcher')

describe('<RatesList />', () => {
  let fetcherMock: any

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render an error if loading failed', async () => {
    fetcherMock = jest.spyOn(fetcher, 'getFranfurterData').mockImplementation(() => {
      throw new Error('Something went wrong')
    })

    const { queryByText } = await render(<RatesList />)

    expect(fetcherMock).toHaveBeenCalledTimes(1)
    expect(fetcherMock).toHaveBeenCalledWith(`/latest?from=${DEFAULT_BASE_CURRENCY}`)
    expect(queryByText(/Something went wrong/)).toBeInTheDocument()
  })

  it('should render the currencies rates if loading was successful', async () => {
    const baseCurrency = 'USD'
    const testRatesResponse = {
      amount: 1.0,
      base: baseCurrency,
      date: '2021-09-03',
      rates: {
        AUD: 1.3444,
        BGN: 1.6474,
        BRL: 5.1616,
      },
    }
    let renderResult: any = {}

    fetcherMock = jest.spyOn(fetcher, 'getFranfurterData').mockImplementation(() => Promise.resolve(testRatesResponse))

    await act(async () => {
      const initialState = { [REDUCER_KEY_APP]: AppStateRecord() }
      const store = configureStore(initialState, history)

      renderResult = await render(
        <Provider store={store}>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <RatesList baseCurrency={baseCurrency} />
          </IntlProvider>
        </Provider>,
      )
    })

    const { container, queryByText } = renderResult

    expect(container.firstChild).toMatchSnapshot()
    expect(container.getElementsByClassName('currency-rate').length).toEqual(
      Object.keys(testRatesResponse.rates).length,
    )
    expect(queryByText(/AUD/)).toBeInTheDocument()
    expect(queryByText(/BGN/)).toBeInTheDocument()
    expect(queryByText(/BRL/)).toBeInTheDocument()
    expect(fetcherMock).toHaveBeenCalledTimes(1)
    expect(fetcherMock).toHaveBeenCalledWith(`/latest?from=${baseCurrency}`)
  })

  it('should not render anything if nothing interesting is provided', async () => {
    fetcherMock = jest.spyOn(fetcher, 'getFranfurterData').mockImplementation(() => Promise.resolve({}))

    let renderResult: any = {}

    await act(async () => {
      renderResult = await render(<RatesList />)
    })

    const { container } = renderResult

    expect(container).toBeEmptyDOMElement()
  })
})
