import { render } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'

import { REDUCER_KEY_APP } from '../../../constants/reducers'
import configureStore from '../../../configureStore'
import { Repo } from '../../../containers/RepoListItem/types'
import history from '../../../utils/history'
import ReposList from '../index'
import { DEFAULT_LOCALE } from '../../../constants/locales'

describe('<ReposList />', () => {
  it('should render the loading indicator when its loading', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <ReposList isFetching />
      </IntlProvider>,
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render an error if loading failed', () => {
    const { queryByText } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <ReposList isFetching={false} error={{ message: 'Loading failed!' }} />
      </IntlProvider>,
    )
    expect(queryByText(/Something went wrong/)).toBeInTheDocument()
  })

  it('should render the repositories if loading was successful', () => {
    const initialState = {
      [REDUCER_KEY_APP]: {
        currentUser: 'mxstbr',
        error: false,
        isFetching: false,
        userData: {
          repos: [],
        },
      },
    }
    const store = configureStore(initialState, history)
    const repos = [
      {
        owner: {
          login: 'mxstbr',
        },
        html_url: 'https://github.com/react-boilerplate/react-boilerplate',
        name: 'react-boilerplate',
        open_issues_count: 20,
        full_name: 'react-boilerplate/react-boilerplate',
      },
    ] as Repo[]
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <ReposList repos={repos} error={false} isFetching={false} />
        </IntlProvider>
      </Provider>,
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should not render anything if nothing interesting is provided', () => {
    const { container, queryByText } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <ReposList repos={undefined} error={false} isFetching={false} />
      </IntlProvider>,
    )

    expect(container).not.toBeEmptyDOMElement()
    expect(queryByText(/Type user name in the input above and press Enter/)).toBeInTheDocument()
  })
})
