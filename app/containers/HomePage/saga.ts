/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects'

import { types as AppActionTypes, actions as AppActions } from 'containers/App/redux'
import fetcher from 'utils/fetcher'

import { selectors } from './redux'

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  const username = yield select(selectors.getUsername())

  try {
    const repos = yield call(fetcher.getUserGithubRepos, username)
    yield put(AppActions.reposLoaded(repos, username))
  } catch (err) {
    yield put(AppActions.repoLoadingError(err))
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  yield takeLatest(AppActionTypes.LOAD_REPOS, getRepos)
}
