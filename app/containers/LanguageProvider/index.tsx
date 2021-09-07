/**
 * LanguageProvider
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react'
import { IntlProvider } from 'react-intl'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

import { DEFAULT_LOCALE } from 'constants/locales'
import { REDUCER_KEY_LANGUAGE } from 'constants/reducers'
import { useInjectSaga } from 'utils/redux-injectors'

import { selectors } from './redux'
import saga from './saga'

export interface Props {
  children: React.ReactNode
}

const stateSelector = createSelector(
  selectors.makeSelectLanguageProviderState(),
  (languageProviderState) => languageProviderState,
)

export default function LanguageProvider(props: Props) {
  const { locale, messages } = useSelector(stateSelector)

  useInjectSaga({ saga, key: REDUCER_KEY_LANGUAGE })

  return (
    <IntlProvider locale={locale} messages={messages} defaultLocale={DEFAULT_LOCALE}>
      {React.Children.only(props.children)}
    </IntlProvider>
  )
}
