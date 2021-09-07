import * as React from 'react'
import useSWR from 'swr'

import List from 'components/List'
import ListItem from 'components/ListItem'
import RatesListItem, { RateItem } from 'containers/RatesListItem'
import fetcher from 'utils/fetcher'
import { DEFAULT_BASE_CURRENCY } from 'constants/franfurter'
import swrLaggy from 'utils/swrLaggy'

type RatesListProps = { baseCurrency?: string }
type RatesResponse = {
  amount: number
  base: string
  date: string
  rates: { [k: string]: number }
}

function RatesList({ baseCurrency = DEFAULT_BASE_CURRENCY }: RatesListProps) {
  const { data, error } = useSWR<RatesResponse>(`/latest?from=${baseCurrency}`, fetcher.getFranfurterData, {
    use: [swrLaggy],
  })

  if (error) {
    return <List component={() => <ListItem item="Something went wrong, please try again!" />} />
  }

  let rates: RateItem[] = []

  if (data?.rates) {
    rates = Object.keys(data.rates).map((key) => ({
      id: key,
      currency: key,
      rate: data.rates[key],
    }))
  }

  if (Array.isArray(rates) && rates.length > 0) {
    return <List<RateItem> items={rates} component={RatesListItem} />
  }

  return null
}

export default RatesList
