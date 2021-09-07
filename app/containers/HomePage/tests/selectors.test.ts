import { selectors } from '../redux'

describe('selectHome', () => {
  it('should select the home state', () => {
    const homeState = {
      userData: {},
    }
    const mockedState: any = {
      home: homeState,
    }
    expect(selectors.selectHome(mockedState)).toEqual(homeState)
  })
})

describe('getUsername', () => {
  const usernameSelector = selectors.getUsername()
  it('should select the username', () => {
    const username = 'mxstbr'
    const mockedState: any = {
      home: {
        username,
      },
    }
    expect(usernameSelector(mockedState)).toEqual(username)
  })
})
