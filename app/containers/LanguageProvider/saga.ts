/**
 * Load/save locale and its messages.
 */

import { takeLatest, call, put } from 'redux-saga/effects'

import { BrowserStorage } from 'lib/classes'
import { CUSTOM_LOCALE_STORAGE_KEY } from 'constants/locales'

import { translationMessages } from '../../i18n'

import { types as LanguageActionTypes, actions } from './redux'

/**
 * Save current locale in browser storage
 */
function* saveLocale(locale) {
  BrowserStorage.getStorage().setItem(CUSTOM_LOCALE_STORAGE_KEY, locale)
}

/**
 * Load messages for locale
 */
function* loadMessages({ locale }) {
  const messages = yield call(translationMessages, locale)

  yield call(saveLocale, locale)
  yield put(actions.setLocaleMessages(messages))
}

/**
 * Root saga manages locale lifecycle
 */
export default function* saga() {
  // @ts-ignore Handles locale data
  yield takeLatest(LanguageActionTypes.CHANGE_LOCALE, loadMessages)
}
