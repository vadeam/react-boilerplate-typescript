/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 *   IMPORTANT: This file is used by the internal build
 *   script `extract-intl`, and must use CommonJS module syntax
 *   You CANNOT use import/export in this file.
 */
const { DEFAULT_LOCALE } = require('constants/locales')

const formatTranslationMessages = (locale, messages): { [k: string]: string } =>
  Object.keys(messages).reduce<{ [k: string]: string }>(
    (formattedMessages, key) => ({
      ...formattedMessages,
      [key]: !((messages[key] ?? false) || messages[key] === '') && locale !== DEFAULT_LOCALE ? key : messages[key],
    }),
    {},
  )

const translationMessages = async (locale: string = DEFAULT_LOCALE): Promise<{ [p: string]: string }> => {
  // Every translation file will be splitted by webpack and downloaded as it is needed.
  const messages = await import(`./translations/${locale}.json`).then((mod) => mod.default)

  return formatTranslationMessages(locale, messages)
}

export { translationMessages, formatTranslationMessages }
