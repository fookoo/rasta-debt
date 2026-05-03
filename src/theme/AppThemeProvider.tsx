import { ThemeProvider } from '@emotion/react'
import type { ReactNode } from 'react'
import { theme } from './theme'
import { GlobalStyles } from './GlobalStyles'

type Props = {
  children: ReactNode
}

export const AppThemeProvider = ({ children }: Props) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    {children}
  </ThemeProvider>
)
