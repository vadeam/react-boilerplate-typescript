/**
 * SelectOption
 */

import * as React from 'react'
import { injectIntl, MessageDescriptor, WrappedComponentProps } from 'react-intl'

type SelectOptionProps = { key: string; value: string | number; message?: MessageDescriptor } & WrappedComponentProps

const SelectOption = ({ value, key, message, intl }: SelectOptionProps) => (
  <option value={value} key={key}>
    {message ? intl.formatMessage(message) : value}
  </option>
)

export default injectIntl(SelectOption)
