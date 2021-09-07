import { render } from '@testing-library/react'
import React from 'react'
import { IntlProvider, defineMessages } from 'react-intl'

import Toggle from '../index'
import { appLocales, DEFAULT_LOCALE } from '../../../constants/locales'

describe('<Toggle />', () => {
  it('should contain default text', () => {
    const messages = defineMessages(
      appLocales.reduce(
        (locales, locale) => ({
          ...locales,
          [locale]: {
            id: `containers.LocaleToggle.${locale}`,
            defaultMessage: `default ${locale.toUpperCase()} message`,
          },
        }),
        {},
      ),
    )
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Toggle values={appLocales} messages={messages} onToggle={() => null} />
      </IntlProvider>,
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should not have ToggleOptions if props.values is not defined', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Toggle onToggle={() => null} />
      </IntlProvider>,
    )
    const elements = container.querySelectorAll('option')
    expect(elements).toHaveLength(1)
    expect(container.firstChild).toHaveTextContent('--')
  })
})
