import { createActions, createReducer } from 'reduxsauce'
import { Record, get } from 'immutable'
import { createSelector } from 'reselect'

import { REDUCER_KEY_HOME } from 'constants/reducers'

import { HomeActionCreators, HomeActionTypes, HomeState, HomeStateRecord, HomeAction } from './types'

const prefix = `[${REDUCER_KEY_HOME}] `
const INITIAL_STATE: Record<HomeState> = HomeStateRecord()
const { Types, Creators: actions } = createActions<HomeActionTypes, HomeActionCreators>(
  {
    changeUsername: ['username'],
  },
  { prefix },
)

const selectHome = (state: ApplicationRootState) => state[REDUCER_KEY_HOME] as Record<HomeState>
const selectors = {
  selectHome,
  getUsername: () => createSelector(selectHome, (homeState): string => get(homeState, 'username', '')),
}

const setUsername: ReducerHandler<Record<HomeState>, HomeAction> = (state, { username }) =>
  state.merge({ username: username.replace(/@/gi, '') })

const reducer = createReducer<Record<HomeState>>(INITIAL_STATE, {
  [Types.CHANGE_USERNAME as string]: setUsername,
})

export { Types as types, prefix as namespace, INITIAL_STATE, actions, reducer, selectors }
