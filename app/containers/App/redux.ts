import { createActions, createReducer } from 'reduxsauce'
import { Record, get, getIn } from 'immutable'
import { createSelector } from 'reselect'

import { REDUCER_KEY_APP, REDUCER_KEY_ROUTER } from 'constants/reducers'
import { Repo } from 'containers/RepoListItem/types'

import {
  AppActionCreators,
  AppActionTypes,
  AppState,
  AppStateRecord,
  LoadReposAction,
  LoadReposSuccessAction,
  LoadReposErrorAction,
} from './types'

const prefix = `[${REDUCER_KEY_APP}] `
const INITIAL_STATE: Record<AppState> = AppStateRecord()
const { Types, Creators: actions } = createActions<AppActionTypes, AppActionCreators>(
  {
    loadRepos: null,
    reposLoaded: ['repos', 'username'],
    repoLoadingError: ['error'],
  },
  { prefix },
)

const selectAppState = (state: ApplicationRootState) => state[REDUCER_KEY_APP] || INITIAL_STATE
const selectRoute = (state: ApplicationRootState) => state[REDUCER_KEY_ROUTER]
const selectors = {
  selectAppState,
  makeSelectCurrentUser: () => createSelector(selectAppState, (appState) => get(appState, 'currentUser', '')),
  makeSelectFetching: () => createSelector(selectAppState, (appState) => get(appState, 'isFetching', false)),
  makeSelectError: () => createSelector(selectAppState, (appState) => get(appState, 'error', null)),
  makeSelectRepos: () =>
    createSelector(selectAppState, (appState) => getIn(appState, ['userData', 'repos'], null) as Nullable<Repo[]>),
  makeSelectLocation: () => createSelector(selectRoute, (routeState) => routeState.location),
}

const loadRepos: ReducerHandler<Record<AppState>, LoadReposAction> = (state) =>
  state.mergeDeep({
    isFetching: true,
    currentUser: state.get('currentUser'),
    userData: {
      repos: null,
    },
    error: null,
  })
const loadReposSuccess: ReducerHandler<Record<AppState>, LoadReposSuccessAction> = (state, { username, repos }) =>
  state.mergeDeep({
    currentUser: username,
    isFetching: false,
    error: false,
    userData: { repos },
  })
const loadReposError: ReducerHandler<Record<AppState>, LoadReposErrorAction<object>> = (state, { error }) =>
  state.mergeDeep({
    error,
    isFetching: false,
    userData: {
      repos: null,
    },
  })

const reducer = createReducer<Record<AppState>>(INITIAL_STATE, {
  [Types.LOAD_REPOS]: loadRepos,
  [Types.REPOS_LOADED]: loadReposSuccess,
  [Types.REPO_LOADING_ERROR]: loadReposError,
})

export { Types as types, prefix as namespace, INITIAL_STATE, actions, reducer, selectors }
