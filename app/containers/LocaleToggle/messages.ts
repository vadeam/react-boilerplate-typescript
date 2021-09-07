/**
 * LocaleToggle Messages
 * This contains all the text for the LanguageToggle component.
 */
import { defineMessages } from 'react-intl'

import { LOCALE_EN, LOCALE_DE } from 'constants/locales'

export const scope = 'containers.LocaleToggle'

export default defineMessages({
  [LOCALE_EN]: {
    id: `${scope}.en`,
    defaultMessage: 'en',
  },
  [LOCALE_DE]: {
    id: `${scope}.de`,
    defaultMessage: 'de',
  },
})
