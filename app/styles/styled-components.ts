import * as styledComponents from 'styled-components'

import DefaultAppTheme from './default-theme'

type AppTheme = typeof DefaultAppTheme
declare module 'styled-components' {
  interface DefaultTheme extends AppTheme {}
}

export interface IThemeInterface {
  default: {
    primary: string
    componentBackground: string
    componentBackgroundSecondary: string
  }
}

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<IThemeInterface>

export { css, createGlobalStyle, keyframes, ThemeProvider }
export default styled
