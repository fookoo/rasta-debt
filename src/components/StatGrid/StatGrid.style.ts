import styled from '@emotion/styled'
import { media } from '../../theme/theme'

export const StatGridRoot = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.space.md};

  ${media.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`
