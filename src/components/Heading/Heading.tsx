import type { ReactNode } from 'react'
import { HeadingRoot, type HeadingLevel } from './Heading.style'

type Props = {
  children: ReactNode
  level?: HeadingLevel
}

export const Heading = ({ children, level = 2 }: Props) => (
  <HeadingRoot as={`h${level}`} level={level}>
    {children}
  </HeadingRoot>
)
