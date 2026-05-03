import styled from '@emotion/styled'
import type { AppTheme } from '../../theme/theme'

export type StackDirection = 'row' | 'column'
export type StackGap = keyof AppTheme['space']
export type StackAlign = 'start' | 'center' | 'end' | 'stretch'
export type StackJustify = 'start' | 'center' | 'end' | 'between'

const ALIGN: Record<StackAlign, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
}

const JUSTIFY: Record<StackJustify, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
}

type StackRootProps = {
  direction: StackDirection
  gap: StackGap
  align: StackAlign
  justify: StackJustify
  wrap: boolean
}

export const StackRoot = styled.div<StackRootProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  gap: ${({ theme, gap }) => theme.space[gap]};
  align-items: ${({ align }) => ALIGN[align]};
  justify-content: ${({ justify }) => JUSTIFY[justify]};
  flex-wrap: ${({ wrap }) => (wrap ? 'wrap' : 'nowrap')};
`
