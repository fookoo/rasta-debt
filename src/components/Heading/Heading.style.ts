import styled from '@emotion/styled'
import type { AppTheme } from '../../theme/theme'

export type HeadingLevel = 1 | 2 | 3

type HeadingRootProps = {
  level: HeadingLevel
}

const SIZE: Record<HeadingLevel, keyof AppTheme['font']['size']> = {
  1: 'xxl',
  2: 'xl',
  3: 'lg',
}

export const HeadingRoot = styled.h1<HeadingRootProps>`
  margin: 0;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: ${({ theme, level }) => theme.font.size[SIZE[level]]};
  color: ${({ theme }) => theme.color.text};
  letter-spacing: -0.01em;
`
