import { Global, css, useTheme } from '@emotion/react'

export const GlobalStyles = () => {
  const theme = useTheme()
  return (
    <Global
      styles={css`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          margin: 0;
          padding: 0;
          min-height: 100%;
        }

        body {
          background: ${theme.color.bg};
          color: ${theme.color.text};
          font-family: ${theme.font.family};
          font-size: ${theme.font.size.md};
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
        }
      `}
    />
  )
}
