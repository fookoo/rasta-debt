import type { ReactNode } from 'react'
import { TextRoot, type TextSize, type TextTone, type TextWeight } from './Text.style'

type Props = {
  children: ReactNode
  size?: TextSize
  tone?: TextTone
  weight?: TextWeight
  as?: 'span' | 'p' | 'div'
}

export const Text = ({
  children,
  size = 'md',
  tone = 'default',
  weight = 'regular',
  as = 'span',
}: Props) => (
  <TextRoot as={as} size={size} tone={tone} weight={weight}>
    {children}
  </TextRoot>
)
