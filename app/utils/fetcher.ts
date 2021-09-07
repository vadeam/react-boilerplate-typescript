import { Repo } from 'containers/RepoListItem/types'

import request from './request'

const fetcher: Fetcher = {
  getUserGithubRepos: <T = Repo[]>(username: string): Promise<T> =>
    request<T>(`https://api.github.com/users/${username}/repos?type=all&sort=updated`),
  getFranfurterData: <T>(path: string): Promise<T> => request<T>(`https://api.frankfurter.app${path}`),
}

export default fetcher
