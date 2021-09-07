/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */
import * as React from 'react'
import 'react-app-polyfill/ie11'
import * as ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import FontFaceObserver from 'fontfaceobserver'
import 'sanitize.css/sanitize.css'
import 'react-app-polyfill/stable'
import * as OfflinePluginRuntime from '@lcdp/offline-plugin/runtime'

import { BrowserStorage } from 'lib/classes/BrowserStorage'
import App from 'containers/App'
import LanguageProvider from 'containers/LanguageProvider'
import history from 'utils/history'
import 'file-loader?name=.htaccess!./.htaccess'
import { actions as localeActions } from 'containers/LanguageProvider/redux'
import { appLocales, CUSTOM_LOCALE_STORAGE_KEY, DEFAULT_LOCALE } from 'constants/locales'

import configureStore from './configureStore'
import { translationMessages } from './i18n'

import '!file-loader?name=[name].[ext]!./images/favicon.ico'

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {})

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded')
})

// Create redux store with history
const initialState = {}
const store = configureStore(initialState, history)
const MOUNT_NODE = document.getElementById('app') as HTMLElement

const ConnectedApp = () => (
  <React.StrictMode>
    <Provider store={store}>
      <LanguageProvider>
        <ConnectedRouter history={history}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>
  </React.StrictMode>
)

const render = () => {
  let locale = (BrowserStorage.getStorage().getItem(CUSTOM_LOCALE_STORAGE_KEY) ?? DEFAULT_LOCALE) as Locales

  if (!appLocales.includes(locale)) {
    locale = DEFAULT_LOCALE
  }

  translationMessages(locale).then((messages) => {
    store.dispatch(localeActions.changeLocale(locale))
    store.dispatch(localeActions.setLocaleMessages(messages))
    ReactDOM.render(<ConnectedApp />, MOUNT_NODE)
  })
}

if (module.hot) {
  // Hot reloadable translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE)
    render()
  })
}

// Chunked polyfill for browsers without Intl support
if (!(window as any).Intl) {
  new Promise((resolve) => {
    resolve(import('intl'))
  })
    // eslint-disable-next-line import/extensions
    .then(() => import('intl/locale-data/jsonp/en.js'))
    .then(() => render())
    .catch((err) => {
      throw err
    })
} else {
  render()
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  OfflinePluginRuntime.install()
}
