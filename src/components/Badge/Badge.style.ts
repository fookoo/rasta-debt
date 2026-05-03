import styled from '@emotion/styled'
import type { AppTheme } from '../../theme/theme'

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'neutral'

const VARIANT = {
  success: (t: AppTheme) => ({ bg: t.color.successSoft, fg: t.color.success }),
  warning: (t: AppTheme) => ({ bg: t.color.warningSoft, fg: t.color.warning }),
  danger: (t: AppTheme) => ({ bg: t.color.dangerSoft, fg: t.color.danger }),
  neutral: (t: AppTheme) => ({ bg: t.color.surfaceMuted, fg: t.color.textMuted }),
}

type BadgeRootProps = {
  variant: BadgeVariant
}

export const BadgeRoot = styled.span<BadgeRootProps>`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.space.xs} ${theme.space.md}`};
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: ${({ theme }) => theme.font.size.xs};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  background: ${({ theme, variant }) => VARIANT[variant](theme).bg};
  color: ${({ theme, variant }) => VARIANT[variant](theme).fg};
  white-space: nowrap;
`
