import type { ReactNode } from 'react'
import {
  StackRoot,
  type StackAlign,
  type StackDirection,
  type StackGap,
  type StackJustify,
} from './Stack.style'

type Props = {
  children: ReactNode
  direction?: StackDirection
  gap?: StackGap
  align?: StackAlign
  justify?: StackJustify
  wrap?: boolean
}

export const Stack = ({
  children,
  direction = 'column',
  gap = 'md',
  align = 'stretch',
  justify = 'start',
  wrap = false,
}: Props) => (
  <StackRoot direction={direction} gap={gap} align={align} justify={justify} wrap={wrap}>
    {children}
  </StackRoot>
)
