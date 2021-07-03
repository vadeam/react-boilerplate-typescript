/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'

import { REDUCER_KEY_APP, REDUCER_KEY_LANGUAGE, REDUCER_KEY_ROUTER } from 'constants/reducers'
import { reducer as appReducer } from 'containers/App/redux'
import { reducer as languageProviderReducer } from 'containers/LanguageProvider/redux'
import history from 'utils/history'

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  return combineReducers({
    [REDUCER_KEY_APP]: appReducer,
    [REDUCER_KEY_LANGUAGE]: languageProviderReducer,
    [REDUCER_KEY_ROUTER]: connectRouter(history),
    ...injectedReducers,
  })
}
