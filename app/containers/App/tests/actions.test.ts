import { Repo } from '../../RepoListItem/types'
import { types, actions } from '../redux'

describe('App Actions', () => {
  describe('loadRepos', () => {
    it('should return the correct type', () => {
      expect(actions.loadRepos()).toEqual({ type: types.LOAD_REPOS })
    })
  })

  describe('reposLoaded', () => {
    it('should return the correct type and the passed repos', () => {
      const repos = [{}] as Repo[]
      const username = 'test'
      const expectedResult = {
        repos,
        username,
        type: types.REPOS_LOADED,
      }

      expect(actions.reposLoaded(repos, username)).toEqual(expectedResult)
    })
  })

  describe('repoLoadingError', () => {
    it('should return the correct type and the error', () => {
      const error = { msg: 'Something went wrong!' }
      const expectedResult = { error, type: types.REPO_LOADING_ERROR }

      expect(actions.repoLoadingError(error)).toEqual(expectedResult)
    })
  })
})
