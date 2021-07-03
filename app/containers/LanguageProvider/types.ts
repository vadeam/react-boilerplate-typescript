import { Record } from 'immutable'

import { LOCALE_EN, LOCALE_DE, DEFAULT_LOCALE } from 'constants/locales'

declare global {
  type Locales = typeof LOCALE_EN | typeof LOCALE_DE
}

export type LocalMessages = { [p: string]: string }

export interface LanguageActionTypes {
  CHANGE_LOCALE: string
  SET_LOCALE_MESSAGES: string
}

export interface ChangeLocaleAction extends Action<LanguageActionTypes> {
  readonly locale: Locales
}

export interface SetLocaleMessagesAction extends Action<LanguageActionTypes> {
  readonly messages: LocalMessages
}

export interface LanguageActionCreators {
  changeLocale: (locale: Locales) => ChangeLocaleAction
  setLocaleMessages: (messages: LocalMessages) => SetLocaleMessagesAction
}

export interface LanguageProviderState extends InheritedReducerState {
  readonly locale: Locales
  readonly messages: LocalMessages
}

export const LanguageProviderStateRecord = Record<LanguageProviderState>(
  {
    locale: DEFAULT_LOCALE,
    messages: {},
  },
  'LanguageProviderStateRecord',
)
