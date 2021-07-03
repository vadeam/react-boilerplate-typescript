import defaultAppTheme from './default-theme'

declare global {
  type AppThemeName = 'default-theme'
}

export type AppTheme = typeof defaultAppTheme

export interface ThemeInterface {
  primary: string
  componentBackground: string
  componentBackgroundSecondary: string
}
