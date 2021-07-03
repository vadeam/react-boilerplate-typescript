import { Record } from 'immutable'

import { HomeState, HomeStateRecord } from '../types'
import { actions, reducer } from '../redux'

describe('homeReducer', () => {
  let state: Record<HomeState>
  beforeEach(() => {
    state = HomeStateRecord()
  })

  it('should return the initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual(state)
  })

  it('should handle the changeUsername action correctly', () => {
    const fixture = 'mxstbr'
    const expectedResult = { username: fixture }

    expect(reducer(state, actions.changeUsername(fixture)).toJS()).toEqual(expectedResult)
  })
})
