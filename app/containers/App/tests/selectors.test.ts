import { REDUCER_KEY_APP, REDUCER_KEY_ROUTER } from '../../../constants/reducers'
import { Repo } from '../../RepoListItem/types'
import { selectors } from '../redux'

describe('selectGlobal', () => {
  it('should select the global state', () => {
    const globalState = {}
    const mockedState: any = {
      [REDUCER_KEY_APP]: globalState,
    }
    expect(selectors.selectAppState(mockedState)).toEqual(globalState)
  })
})

describe('makeSelectCurrentUser', () => {
  it('should select the current user', () => {
    const currentUserSelector = selectors.makeSelectCurrentUser()
    const username = 'mxstbr'
    const mockedState: any = {
      [REDUCER_KEY_APP]: {
        currentUser: username,
      },
    }
    expect(currentUserSelector(mockedState)).toEqual(username)
  })
})

describe('makeSelectLoading', () => {
  it('should select the isFetching', () => {
    const loadingSelector = selectors.makeSelectFetching()
    const isFetching = false
    const mockedState: any = {
      [REDUCER_KEY_APP]: {
        isFetching,
      },
    }
    expect(loadingSelector(mockedState)).toEqual(isFetching)
  })
})

describe('makeSelectError', () => {
  it('should select the error', () => {
    const errorSelector = selectors.makeSelectError()
    const error = 404
    const mockedState: any = {
      [REDUCER_KEY_APP]: {
        error,
      },
    }
    expect(errorSelector(mockedState)).toEqual(error)
  })
})

describe('makeSelectRepos', () => {
  it('should select the repos', () => {
    const reposSelector = selectors.makeSelectRepos()
    const repos: Repo[] = []
    const mockedState: any = {
      [REDUCER_KEY_APP]: {
        userData: { repos },
      },
    }
    expect(reposSelector(mockedState)).toEqual(repos)
  })
})

describe('makeSelectLocation', () => {
  it('should select the location', () => {
    const locationStateSelector = selectors.makeSelectLocation()
    const router = {
      location: { pathname: '/foo' },
    }
    const mockedState: any = {
      [REDUCER_KEY_ROUTER]: router,
    }
    expect(locationStateSelector(mockedState)).toEqual(router.location)
  })
})
