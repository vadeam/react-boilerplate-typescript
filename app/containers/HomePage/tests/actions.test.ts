import { actions, types } from '../redux'

describe('Home Actions', () => {
  describe('changeUsername', () => {
    it('should return the correct type and the passed name', () => {
      const fixture = 'Max'
      const expectedResult = { type: types.CHANGE_USERNAME, username: fixture }

      expect(actions.changeUsername(fixture)).toEqual(expectedResult)
    })
  })
})
