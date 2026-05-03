import type { ReactNode } from 'react'
import { StatGridRoot } from './StatGrid.style'

type Props = {
  children: ReactNode
}

export const StatGrid = ({ children }: Props) => <StatGridRoot>{children}</StatGridRoot>
