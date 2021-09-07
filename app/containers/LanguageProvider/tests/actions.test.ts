import { LOCALE_DE } from 'constants/locales'

import { types as ActionTypes, actions } from '../redux'

describe('LanguageProvider actions', () => {
  describe('Change Local Action', () => {
    it(`has a type of ${ActionTypes.CHANGE_LOCALE}`, () => {
      const expected = { type: ActionTypes.CHANGE_LOCALE, locale: LOCALE_DE }
      expect(actions.changeLocale(LOCALE_DE)).toEqual(expected)
    })
  })
})
