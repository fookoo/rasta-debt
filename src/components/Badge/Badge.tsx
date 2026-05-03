import type { ReactNode } from 'react'
import { BadgeRoot, type BadgeVariant } from './Badge.style'

type Props = {
  children: ReactNode
  variant?: BadgeVariant
}

export const Badge = ({ children, variant = 'neutral' }: Props) => (
  <BadgeRoot variant={variant}>{children}</BadgeRoot>
)
