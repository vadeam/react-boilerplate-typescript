import * as React from 'react'

import Ul from './Ul'
import Wrapper from './Wrapper'

type ComponentToRenderProps<T> = T & { id: string | number }

interface Props<T> {
  component: React.FC<{ key?: string | number; item?: T }>
  items?: ComponentToRenderProps<T>[]
}

export default function List<T = any>({ items, component: ComponentToRender }: Props<T>) {
  let content: JSX.Element | JSX.Element[]

  // If we have items, render them
  if (items) {
    content = items.map((listItem) => <ComponentToRender key={`item-${listItem.id}`} item={listItem} />)
  } else {
    // Otherwise render a single component
    content = <ComponentToRender />
  }

  return (
    <Wrapper>
      <Ul>{content}</Ul>
    </Wrapper>
  )
}
