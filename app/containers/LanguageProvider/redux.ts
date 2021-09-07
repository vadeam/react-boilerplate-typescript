import { createActions, createReducer } from 'reduxsauce'
import { Record, get } from 'immutable'
import { createSelector } from 'reselect'

import { REDUCER_KEY_LANGUAGE } from 'constants/reducers'
import { DEFAULT_LOCALE } from 'constants/locales'

import {
  LanguageActionCreators,
  LanguageActionTypes,
  LanguageProviderState,
  LanguageProviderStateRecord,
  ChangeLocaleAction,
  SetLocaleMessagesAction,
} from './types'

const prefix = `[${REDUCER_KEY_LANGUAGE}] `
const INITIAL_STATE: Record<LanguageProviderState> = LanguageProviderStateRecord()
const { Types, Creators: actions } = createActions<LanguageActionTypes, LanguageActionCreators>(
  {
    changeLocale: ['locale'],
    setLocaleMessages: ['messages'],
  },
  { prefix },
)

const selectLanguageState = (state: ApplicationRootState) =>
  (state[REDUCER_KEY_LANGUAGE] || INITIAL_STATE) as Record<LanguageProviderState>
const selectors = {
  selectLanguageState,
  makeSelectLanguageProviderState: () =>
    createSelector(selectLanguageState, (languageState) => languageState.toJS() as LanguageProviderState),
  makeSelectLocale: () =>
    createSelector(selectLanguageState, (languageState): Locales => get(languageState, 'locale', DEFAULT_LOCALE)),
}

const changeLocale: ReducerHandler<Record<LanguageProviderState>, ChangeLocaleAction> = (state, { locale }) =>
  state.merge({ locale })
const setLocaleMessages: ReducerHandler<Record<LanguageProviderState>, SetLocaleMessagesAction> = (
  state,
  { messages },
) => state.merge({ messages })

const reducer = createReducer<Record<LanguageProviderState>>(INITIAL_STATE, {
  [Types.CHANGE_LOCALE]: changeLocale,
  [Types.SET_LOCALE_MESSAGES]: setLocaleMessages,
})

export { Types as types, prefix as namespace, INITIAL_STATE, actions, reducer, selectors }
