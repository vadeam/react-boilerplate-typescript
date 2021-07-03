/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react'
import { FormattedNumber } from 'react-intl'
import { useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import ListItem from 'components/ListItem'
import { selectors } from 'containers/HomePage/redux'

import { IssueIconStyled, IssueLinkStyled, RepoLinkStyled, WrapperStyled } from './styled'
import { Repo } from './types'

type OwnProps = { item: Repo }
type DispatchProps = {}
type Props = DispatchProps & OwnProps

const stateSelector = createStructuredSelector({
  currentUser: selectors.getUsername(),
})

export default function RepoListItem({ item }: Props) {
  const { currentUser } = useSelector(stateSelector)
  let nameprefix = ''

  if (item.owner.login !== currentUser) {
    nameprefix = `${item.owner.login}/`
  }

  const content = (
    <WrapperStyled>
      <RepoLinkStyled href={item.html_url} target="_blank">
        {nameprefix + item.name}
      </RepoLinkStyled>
      <IssueLinkStyled href={`${item.html_url}/issues`} target="_blank">
        <IssueIconStyled />
        <FormattedNumber value={item.open_issues_count} />
      </IssueLinkStyled>
    </WrapperStyled>
  )

  return <ListItem key={`repo-list-item-${item.full_name}`} item={content} />
}
