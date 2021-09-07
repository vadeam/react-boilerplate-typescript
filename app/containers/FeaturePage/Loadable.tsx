/**
 * Asynchronously loads the component for FeaturePage
 */
import * as React from 'react'

import LoadingIndicator from 'components/LoadingIndicator'
import loadable from 'utils/loadable'

export default loadable(() => import('./index'), {
  fallback: <LoadingIndicator />,
})
