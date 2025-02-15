/**
 * Test store addons
 */
import { composeWithDevTools } from 'redux-devtools-extension'

import configureStore from '../configureStore'
import history from '../utils/history'

describe('configureStore', () => {
  it('should return a redux store', () => {
    const store = configureStore({}, history)
    expect(store).toEqual(
      expect.objectContaining({
        dispatch: expect.any(Function),
        subscribe: expect.any(Function),
        getState: expect.any(Function),
        replaceReducer: expect.any(Function),
      }),
    )
  })
})

jest.mock('redux-devtools-extension', () => ({
  composeWithDevTools: jest.fn(),
}))

describe('configureStore params', () => {
  it('should call composeWithDevTools', () => {
    configureStore(undefined, history)
    expect(composeWithDevTools).toHaveBeenCalled()
  })
})
