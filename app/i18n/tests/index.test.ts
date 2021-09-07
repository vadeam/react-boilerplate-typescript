import { DEFAULT_LOCALE } from 'constants/locales'

import { formatTranslationMessages } from '../index'

jest.mock('../translations/en.json', () => ({
  message1: 'default message',
  message2: 'default message 2',
}))

const esTranslationMessages = {
  message1: 'mensaje predeterminado',
  message2: undefined,
}

describe('formatTranslationMessages', () => {
  it('should build only defaults when DEFAULT_LOCALE', () => {
    const result = formatTranslationMessages(DEFAULT_LOCALE, { a: 'a' })

    expect(result).toEqual({ a: 'a' })
  })

  it('should combine default locale and current locale when not DEFAULT_LOCALE', () => {
    const result = formatTranslationMessages('NON-DEFAULT-LOCALE', esTranslationMessages)

    expect(result).toEqual({
      message1: 'mensaje predeterminado',
      message2: 'message2',
    })
  })
})
