/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react'
import { FormattedNumber } from 'react-intl'

import ListItem from 'components/ListItem'

import { WrapperStyled } from './styled'

export type RateItem = { id: string; currency: string; rate: number }
type RatesListItemProps = { item: RateItem }

export default function RatesListItem({ item: { id, currency, rate } }: RatesListItemProps) {
  const content = (
    <WrapperStyled className="currency-rate">
      {currency}:&nbsp;&nbsp;
      <FormattedNumber value={rate} maximumFractionDigits={4} />
    </WrapperStyled>
  )

  return <ListItem key={`rates-list-item-${id}`} item={content} />
}
