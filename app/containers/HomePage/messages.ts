/**
 * HomePage Messages
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl'

export const scope = 'containers.HomePage'

export default defineMessages({
  startProjectHeader: {
    id: `${scope}.start_project.header`,
    defaultMessage: 'Start your next react project in seconds (default message)',
  },
  startProjectMessage: {
    id: `${scope}.start_project.message`,
    defaultMessage:
      'A highly scalable, offline-first foundation with the best DX and a focus on performance and best practices',
  },
  trymeHeader: {
    id: `${scope}.tryme.header`,
    defaultMessage: 'Try me!',
  },
  trymeMessage: {
    id: `${scope}.tryme.message`,
    defaultMessage: 'Show Github repositories by',
  },
  trymeAtPrefix: {
    id: `${scope}.tryme.atPrefix`,
    defaultMessage: '@',
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Home Page',
  },
  frankfurterHeader: {
    id: `${scope}.frankfurter.header`,
    defaultMessage: 'Frankfurter Rates',
  },
  frankfurterLabel: {
    id: `${scope}.frankfurter.label`,
    defaultMessage: 'Base currency',
  },
})
