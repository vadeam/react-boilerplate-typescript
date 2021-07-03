import { Record } from 'immutable'

export interface HomeActionTypes {
  CHANGE_USERNAME: string
}

export interface HomeAction extends Action<HomeActionTypes> {
  readonly username: string
}

export interface HomeActionCreators {
  changeUsername: (username: string) => HomeAction
}

export interface HomeState extends InheritedReducerState {
  readonly username: string
}

export const HomeStateRecord = Record<HomeState>(
  {
    username: '',
  },
  'HomeStateRecord',
)
