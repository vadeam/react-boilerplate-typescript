/**
 * HomePage
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useCallback, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import useSWR from 'swr'

import H2 from 'components/H2'
import ReposList from 'components/ReposList'
import RatesList from 'components/RatesList'
import Toggle from 'components/Toggle'
import { selectors as appSelectors, actions as appActions } from 'containers/App/redux'
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors'
import { REDUCER_KEY_HOME } from 'constants/reducers'
import { DEFAULT_BASE_CURRENCY } from 'constants/franfurter'

import fetcher from '../../utils/fetcher'

import {
  AtPrefixStyled,
  DisclaimerStyled,
  CurrencyBlockStyled,
  FormStyled,
  InputStyled,
  SectionStyled,
  ContentWrapperStyled,
  FrankfurterLabelStyled,
} from './styled'
import messages from './messages'
import { actions, reducer, selectors } from './redux'
import saga from './saga'

const stateSelector = createStructuredSelector({
  repos: appSelectors.makeSelectRepos(),
  username: selectors.getUsername(),
  isFetching: appSelectors.makeSelectFetching(),
  error: appSelectors.makeSelectError(),
})

export default function HomePage() {
  const { formatMessage } = useIntl()
  const { username, repos, isFetching, error } = useSelector(stateSelector)
  const dispatch = useDispatch()
  // Not gonna declare event types here. No need. any is fine
  const onChangeUsername = useCallback((evt: any) => dispatch(actions.changeUsername(evt.target.value)), [dispatch])
  const onSubmitForm = useCallback(
    (evt: any) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault()
      }
      if (!username) {
        dispatch(appActions.reposLoaded(null, ''))
      } else {
        dispatch(appActions.loadRepos())
      }
    },
    [username, dispatch],
  )

  const [baseCurrency, setBaseCurrency] = useState<string>(DEFAULT_BASE_CURRENCY)
  const onBaseCurrencyToggle = useCallback((evt) => setBaseCurrency(evt.target.value), [])
  const { data: currenciesResponse } = useSWR<{ [k: string]: string }>('/currencies', fetcher.getFranfurterData)

  useInjectReducer({ key: REDUCER_KEY_HOME, reducer })
  useInjectSaga({ key: REDUCER_KEY_HOME, saga })

  return (
    <article>
      <Helmet>
        <title>{formatMessage({ ...messages.title })}</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <div>
        <DisclaimerStyled>
          <H2>
            <FormattedMessage {...messages.startProjectHeader} />
          </H2>
          <p>
            <FormattedMessage {...messages.startProjectMessage} />
          </p>
        </DisclaimerStyled>
        <ContentWrapperStyled>
          <SectionStyled width="70%">
            <H2>
              <FormattedMessage {...messages.trymeHeader} />
            </H2>
            <FormStyled onSubmit={onSubmitForm}>
              <label htmlFor="username">
                <FormattedMessage {...messages.trymeMessage} />
                <AtPrefixStyled>
                  <FormattedMessage {...messages.trymeAtPrefix} />
                </AtPrefixStyled>
                <InputStyled
                  id="username"
                  type="text"
                  placeholder="mxstbr"
                  value={username}
                  onChange={onChangeUsername}
                />
              </label>
            </FormStyled>
            <ReposList {...{ isFetching, error, repos }} />
          </SectionStyled>
          <SectionStyled width="30%">
            <H2>
              <FormattedMessage {...messages.frankfurterHeader} />
            </H2>
            <CurrencyBlockStyled>
              <FrankfurterLabelStyled>
                <FormattedMessage {...messages.frankfurterLabel} />
                :&nbsp;&nbsp;&nbsp;
              </FrankfurterLabelStyled>
              <Toggle
                value={baseCurrency}
                values={Object.keys(currenciesResponse ?? {})}
                onToggle={onBaseCurrencyToggle}
              />
            </CurrencyBlockStyled>
            <RatesList baseCurrency={baseCurrency} />
          </SectionStyled>
        </ContentWrapperStyled>
      </div>
    </article>
  )
}
