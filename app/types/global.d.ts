import { Repo } from 'containers/RepoListItem/types'
import { ResponseError } from 'utils/request'

declare global {
  type Nullable<T> = T | null
  type Void<T> = T | void | undefined

  interface Fetcher {
    getUserGithubRepos: (username: string) => Promise<Repo[] | ResponseError>
    getFranfurterData: <T>(path: string) => Promise<T>
  }
}
