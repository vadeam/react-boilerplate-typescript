/**
 * Toggle
 */

import * as React from 'react'
import { MessageDescriptor } from 'react-intl'

import SelectOption from './SelectOption'
import Select from './Select'

interface ToggleProps {
  onToggle: (event: any) => void
  messages?: {
    [k: string]: MessageDescriptor
  }
  value?: string | number
  values?: string[]
}

function Toggle({ values, value, messages, onToggle }: ToggleProps) {
  const emptyValue = '--'
  let content: JSX.Element | JSX.Element[] = <SelectOption key={emptyValue} value={emptyValue} />

  // If we have items, render them
  if (values) {
    content = values.map((val) => <SelectOption key={val} value={val} message={messages ? messages[val] : undefined} />)
  }

  return (
    <Select value={value ?? emptyValue} onChange={onToggle}>
      {content}
    </Select>
  )
}

export default Toggle
