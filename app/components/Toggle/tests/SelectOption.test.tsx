import { render } from '@testing-library/react'
import React from 'react'
import { IntlProvider, defineMessages } from 'react-intl'

import SelectOption from '../SelectOption'
import { LOCALE_EN, LOCALE_DE } from '../../../constants/locales'

describe('<SelectOption />', () => {
  it('should render default language messages', () => {
    const message = defineMessages({
      enMessage: {
        id: `containers.LocaleToggle.${LOCALE_EN}`,
        defaultMessage: 'someContent',
      },
    })
    const { container } = render(
      <IntlProvider locale={LOCALE_EN}>
        <SelectOption key="key" value={LOCALE_EN} message={message.enMessage} />
      </IntlProvider>,
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should display `value`(two letter language code) when `message` is absent', () => {
    const { queryByText } = render(
      <IntlProvider locale={LOCALE_DE}>
        {/* @ts-ignore */}
        <SelectOption value={LOCALE_DE} />
      </IntlProvider>,
    )
    expect(queryByText(LOCALE_DE)).toBeInTheDocument()
  })
})
