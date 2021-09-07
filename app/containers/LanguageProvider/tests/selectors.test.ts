import { REDUCER_KEY_LANGUAGE } from 'constants/reducers'

import { selectors, INITIAL_STATE } from '../redux'
import { LanguageProviderStateRecord } from '../types'

describe('selectLanguageState', () => {
  it('should select the language state', () => {
    const languageState = LanguageProviderStateRecord()
    const mockedState: any = {
      [REDUCER_KEY_LANGUAGE]: languageState,
    }
    expect(selectors.selectLanguageState(mockedState)).toEqual(languageState)
  })

  it('should select the initial state when state is missing', () => {
    const mockedState: any = {}
    expect(selectors.selectLanguageState(mockedState)).toEqual(INITIAL_STATE)
  })
})
