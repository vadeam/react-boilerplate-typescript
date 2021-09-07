import { Record } from 'immutable'

import { Repo } from 'containers/RepoListItem/types'

export interface AppActionTypes {
  LOAD_REPOS: string
  REPOS_LOADED: string
  REPO_LOADING_ERROR: string
}

export interface LoadReposAction extends Action<AppActionTypes> {}

export interface LoadReposSuccessAction extends Action<AppActionTypes> {
  readonly repos: Nullable<Repo[]>
  readonly username: string
}

export interface LoadReposErrorAction<T = object> extends Action<AppActionTypes> {
  readonly error: T
}

export type AppActions = LoadReposAction | LoadReposSuccessAction | LoadReposErrorAction

export interface AppActionCreators {
  loadRepos: () => LoadReposAction
  reposLoaded: (repos: Nullable<Repo[]>, username: string) => LoadReposSuccessAction
  repoLoadingError: (error: object) => LoadReposErrorAction
}

export interface UserData {
  readonly repos: Nullable<Repo[]>
}

export const UserDataRecord = Record<UserData>({ repos: null }, 'UserDataRecord')

export interface AppState extends InheritedReducerState {
  readonly currentUser: string
  readonly userData: UserData
}

export const AppStateRecord = Record<AppState>(
  {
    isFetching: false,
    currentUser: '',
    userData: UserDataRecord(),
    error: null,
  },
  'AppStateRecord',
)
