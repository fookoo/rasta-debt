import type { ReactNode } from 'react'
import { CardRoot } from './Card.style'

type Props = {
  children: ReactNode
}

export const Card = ({ children }: Props) => <CardRoot>{children}</CardRoot>
