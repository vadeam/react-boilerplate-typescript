/**
 * Tests for HomePage sagas
 */

import { put, takeLatest } from 'redux-saga/effects'

import { types as ActionTypes, actions } from 'containers/App/redux'

import { Repo } from '../../RepoListItem/types'
import githubData, { getRepos } from '../saga'

const username = 'mxstbr'

jest.mock('utils/fetcher', () => ({
  getUserGithubRepos: jest.fn(),
}))

describe('getRepos Saga', () => {
  let getReposGenerator

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getReposGenerator = getRepos()

    const selectDescriptor = getReposGenerator.next().value
    expect(selectDescriptor).toMatchSnapshot()

    const callDescriptor = getReposGenerator.next(username).value
    expect(callDescriptor).toMatchSnapshot()
  })

  it('should dispatch the reposLoaded action if it requests the data successfully', () => {
    const response = [
      {
        name: 'First repo',
      },
      {
        name: 'Second repo',
      },
    ] as Repo[]
    const putDescriptor = getReposGenerator.next(response).value
    expect(putDescriptor).toEqual(put(actions.reposLoaded(response, username)))
  })

  it('should call the repoLoadingError action if the response errors', () => {
    const response = new Error('Some error')
    const putDescriptor = getReposGenerator.throw(response).value
    expect(putDescriptor).toEqual(put(actions.repoLoadingError(response)))
  })
})

describe('githubDataSaga Saga', () => {
  const githubDataSaga = githubData()

  it('should start task to watch for LOAD_REPOS action', () => {
    const takeLatestDescriptor = githubDataSaga.next().value
    expect(takeLatestDescriptor).toEqual(takeLatest(ActionTypes.LOAD_REPOS, getRepos))
  })
})
