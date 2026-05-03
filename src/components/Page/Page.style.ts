import styled from '@emotion/styled'
import { media } from '../../theme/theme'

export const PageRoot = styled.main`
  min-height: 100vh;
  padding: ${({ theme }) => theme.space.lg};
  display: flex;
  justify-content: center;

  ${media.md} {
    padding: ${({ theme }) => theme.space.xl};
  }
`

export const PageInner = styled.div`
  width: 100%;
  max-width: 960px;
`
