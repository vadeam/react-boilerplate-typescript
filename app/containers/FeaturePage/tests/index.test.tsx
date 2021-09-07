import { render } from '@testing-library/react'
import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { IntlProvider } from 'react-intl'

import { LOCALE_EN } from 'constants/locales'

import FeaturePage from '../index'

describe('<FeaturePage />', () => {
  it('should render its heading', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={LOCALE_EN}>
        <HelmetProvider>
          <FeaturePage />
        </HelmetProvider>
      </IntlProvider>,
    )

    expect(firstChild).toMatchSnapshot()
  })
})
