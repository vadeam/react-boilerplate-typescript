import * as styledComponents from 'styled-components'

import { ThemeInterface, AppTheme } from './types'

declare module 'styled-components' {
  interface DefaultTheme extends AppTheme {}
}

export const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<ThemeInterface>

export default styled
