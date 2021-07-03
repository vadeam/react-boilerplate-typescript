import { LOCALE_DE } from 'constants/locales'

import { reducer, INITIAL_STATE, actions } from '../redux'

describe('languageProviderReducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual(INITIAL_STATE)
  })

  it('changes the locale', () => {
    expect(reducer(undefined, actions.changeLocale(LOCALE_DE)).toJS()).toEqual({
      locale: LOCALE_DE,
      messages: {},
    })
  })
})
