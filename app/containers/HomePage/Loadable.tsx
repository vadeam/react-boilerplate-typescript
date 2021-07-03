/**
 * Asynchronously loads the component for HomePage
 */

import * as React from 'react'

import LoadingIndicator from 'components/LoadingIndicator'
import loadable from 'utils/loadable'

export default loadable(() => import('./index'), {
  fallback: <LoadingIndicator />,
})
