import * as React from 'react'

import Item from './Item'
import Wrapper from './Wrapper'

type ListItemProps = { item: any; className?: string }

export default function ListItem(props: ListItemProps) {
  return (
    <Wrapper className={props.className}>
      <Item>{props.item}</Item>
    </Wrapper>
  )
}
