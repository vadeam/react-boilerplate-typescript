/**
 * LanguageToggle
 */

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from 'reselect'

import Toggle from 'components/Toggle'
import { appLocales } from 'constants/locales'
import { actions, selectors } from 'containers/LanguageProvider/redux'

import messages from './messages'
import { WrapperStyled } from './styled'

const stateSelector = createSelector(selectors.makeSelectLocale(), (locale) => locale)

export default function LocaleToggle() {
  const locale = useSelector(stateSelector)
  const dispatch = useDispatch()
  const onLocaleToggle = (evt) => dispatch(actions.changeLocale(evt.target.value))

  return (
    <WrapperStyled>
      <Toggle value={locale} values={appLocales} messages={messages} onToggle={onLocaleToggle} />
    </WrapperStyled>
  )
}
