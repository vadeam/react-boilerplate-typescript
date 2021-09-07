import { Action as ReduxAction, Reducer, Store } from 'redux'
import { Saga } from 'redux-saga'
import { SagaInjectionModes } from 'redux-injectors'
import { RouterState } from 'connected-react-router'
import { Record } from 'immutable'

import { AppState } from 'containers/App/types'
import { LanguageProviderState } from 'containers/LanguageProvider/types'
import { HomeState } from 'containers/HomePage/types'
import {
  REDUCER_KEY_APP,
  REDUCER_KEY_LANGUAGE,
  REDUCER_KEY_ROUTER,
  REDUCER_KEY_HOME,
  REDUCER_KEY_TEST,
} from 'constants/reducers'

declare global {
  interface InjectedStore extends Store {
    injectedReducers: any
    injectedSagas: any

    runSaga(saga: Saga | undefined, args: any | undefined): any
  }

  interface InjectReducerParams {
    key: keyof ApplicationRootState
    reducer: Reducer<any, any>
  }

  interface InjectSagaParams {
    key: keyof ApplicationRootState
    saga: Saga
    mode?: SagaInjectionModes
  }

  // Your root reducer type, which is your redux state types also
  interface ApplicationRootState {
    readonly [REDUCER_KEY_APP]: Record<AppState>
    readonly [REDUCER_KEY_LANGUAGE]: Record<LanguageProviderState>
    readonly [REDUCER_KEY_ROUTER]: RouterState
    readonly [REDUCER_KEY_HOME]: Record<HomeState>
    // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly

    // for testing purposes
    readonly [REDUCER_KEY_TEST]: any
  }

  interface InheritedReducerState {
    isFetching?: boolean
    error?: Nullable<object | boolean>
  }

  type ReducerHandler<T, U> = (state: T, action: U) => T

  type Action<T> = ReduxAction<T>
}
