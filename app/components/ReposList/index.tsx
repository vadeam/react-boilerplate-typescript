import * as React from 'react'
import { useIntl } from 'react-intl'

import List from 'components/List'
import Wrapper from 'components/List/Wrapper'
import ListItem from 'components/ListItem'
import LoadingIndicator from 'components/LoadingIndicator'
import RepoListItem from 'containers/RepoListItem'

import { Repo } from '../../containers/RepoListItem/types'

import TextWrapper from './TextWrapper'
import messages from './messages'

type ReposListProps = {
  isFetching?: boolean
  error?: Nullable<object | boolean>
  repos?: Nullable<Repo[]>
}

function ReposList({ isFetching, error, repos }: ReposListProps) {
  const { formatMessage } = useIntl()

  if (isFetching) {
    return <List component={LoadingIndicator} />
  }

  if (error) {
    return <List component={() => <ListItem item="Something went wrong, please try again!" />} />
  }

  if (repos) {
    return <List<Repo> items={repos} component={RepoListItem} />
  }

  return (
    <Wrapper>
      <TextWrapper>{formatMessage({ ...messages.userHint })}</TextWrapper>
    </Wrapper>
  )
}

export default ReposList
