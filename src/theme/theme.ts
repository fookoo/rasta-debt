export const theme = {
  color: {
    bg: '#0f172a',
    surface: '#1e293b',
    surfaceMuted: '#334155',
    border: '#334155',
    text: '#f1f5f9',
    textMuted: '#94a3b8',
    primary: '#38bdf8',
    primaryStrong: '#0ea5e9',
    success: '#22c55e',
    successSoft: 'rgba(34, 197, 94, 0.16)',
    warning: '#f59e0b',
    warningSoft: 'rgba(245, 158, 11, 0.16)',
    danger: '#ef4444',
    dangerSoft: 'rgba(239, 68, 68, 0.16)',
  },
  space: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
    xxxl: '48px',
  },
  radius: {
    sm: '6px',
    md: '10px',
    lg: '16px',
    pill: '999px',
  },
  font: {
    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    size: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '20px',
      xl: '28px',
      xxl: '36px',
    },
    weight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  breakpoint: {
    md: '768px',
    lg: '1024px',
  },
  shadow: {
    card: '0 4px 16px rgba(0, 0, 0, 0.25)',
  },
} as const

export type AppTheme = typeof theme

export const media = {
  md: `@media (min-width: ${theme.breakpoint.md})`,
  lg: `@media (min-width: ${theme.breakpoint.lg})`,
} as const
