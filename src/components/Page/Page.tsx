import type { ReactNode } from 'react'
import { PageInner, PageRoot } from './Page.style'

type Props = {
  children: ReactNode
}

export const Page = ({ children }: Props) => (
  <PageRoot>
    <PageInner>{children}</PageInner>
  </PageRoot>
)
