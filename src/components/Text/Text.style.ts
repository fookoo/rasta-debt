import styled from '@emotion/styled'
import type { AppTheme } from '../../theme/theme'

export type TextSize = keyof AppTheme['font']['size']
export type TextTone = 'default' | 'muted' | 'success' | 'danger' | 'warning' | 'primary'
export type TextWeight = keyof AppTheme['font']['weight']

const TONE_COLOR = {
  default: (t: AppTheme) => t.color.text,
  muted: (t: AppTheme) => t.color.textMuted,
  success: (t: AppTheme) => t.color.success,
  danger: (t: AppTheme) => t.color.danger,
  warning: (t: AppTheme) => t.color.warning,
  primary: (t: AppTheme) => t.color.primary,
}

type TextRootProps = {
  size: TextSize
  tone: TextTone
  weight: TextWeight
}

export const TextRoot = styled.span<TextRootProps>`
  font-size: ${({ theme, size }) => theme.font.size[size]};
  color: ${({ theme, tone }) => TONE_COLOR[tone](theme)};
  font-weight: ${({ theme, weight }) => theme.font.weight[weight]};
  line-height: 1.4;
`
