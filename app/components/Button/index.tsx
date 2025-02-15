/**
 *
 * Button.js
 *
 * A common button, if you pass it a prop "route" it'll render a link to a react-router route
 * otherwise it'll render a link with an onclick
 */

import React, { Children, ReactNode } from 'react'

import A from './A'
import StyledButton from './StyledButton'
import Wrapper from './Wrapper'

export interface Props {
  handleRoute?(): void
  href?: string
  onClick?(): void
  children?: ReactNode
}
function Button(props: Props) {
  // Render an anchor tag
  let button = (
    <A href={props.href} onClick={props.onClick}>
      {Children.toArray(props.children)}
    </A>
  )

  // If the Button has a handleRoute prop, we want to render a button
  if (props.handleRoute) {
    button = <StyledButton onClick={props.handleRoute}>{Children.toArray(props.children)}</StyledButton>
  }

  return <Wrapper>{button}</Wrapper>
}

export default Button
