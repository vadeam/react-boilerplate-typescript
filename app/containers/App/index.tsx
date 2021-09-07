/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react'
import { Helmet } from 'react-helmet-async'
import { hot } from 'react-hot-loader/root'
import { Route, Switch } from 'react-router-dom'

import Footer from 'components/Footer'
import Header from 'components/Header'
import FeaturePage from 'containers/FeaturePage/Loadable'
import HomePage from 'containers/HomePage/Loadable'
import NotFoundPage from 'containers/NotFoundPage/Loadable'
import { ThemeProvider } from 'styles/styled-components'
import defaultAppTheme from 'styles/default-theme'
import GlobalStyle from 'global-styles'

import { AppWrapperStyled } from './styled'

function App() {
  return (
    <ThemeProvider theme={defaultAppTheme}>
      <AppWrapperStyled>
        <Helmet titleTemplate="%s | React Boilerplate" defaultTitle="React Boilerplate">
          <meta name="description" content="React Boilerplate application" />
        </Helmet>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/features" component={FeaturePage} />
          <Route component={NotFoundPage} />
        </Switch>
        <Footer />
        <GlobalStyle />
      </AppWrapperStyled>
    </ThemeProvider>
  )
}

export default hot(App)
