import { Record } from 'immutable'

import { Repo } from 'containers/RepoListItem/types'

import { reducer, actions } from '../redux'
import { AppState, AppStateRecord } from '../types'

describe('appReducer', () => {
  let state: Record<AppState>
  beforeEach(() => {
    state = AppStateRecord()
  })

  it('should return the initial state', () => {
    expect(reducer(undefined, {} as any).toJS()).toEqual(state.toJS())
  })

  it('should handle the loadRepos action correctly', () => {
    const expectedResult = {
      currentUser: '',
      isFetching: true,
      error: null,
      userData: {
        repos: null,
      },
    }
    expect(reducer(state, actions.loadRepos()).toJS()).toEqual(expectedResult)
  })

  it('should handle the reposLoaded action correctly', () => {
    const fixture = [
      {
        name: 'My Repo',
      },
    ] as Repo[]
    const username = 'test'
    const expectedResult = {
      currentUser: username,
      isFetching: false,
      error: false,
      userData: {
        repos: fixture,
      },
    }
    expect(reducer(state, actions.reposLoaded(fixture, username)).toJS()).toEqual(expectedResult)
  })

  it('should handle the repoLoadingError action correctly', () => {
    const fixture = {
      msg: 'Not found',
    }

    const expectedResult = {
      currentUser: '',
      error: fixture,
      isFetching: false,
      userData: {
        repos: null,
      },
    }

    expect(reducer(state, actions.repoLoadingError(fixture)).toJS()).toEqual(expectedResult)
  })
})
