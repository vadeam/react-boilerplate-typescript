import { useInjectReducer as useReducer, useInjectSaga as useSaga } from 'redux-injectors'

// export them with stricter type definitions

const useInjectReducer = ({ key, reducer }: InjectReducerParams) => useReducer({ key, reducer })
const useInjectSaga = ({ key, saga, mode }: InjectSagaParams) => useSaga({ key, saga, mode })

export { useInjectReducer, useInjectSaga }
