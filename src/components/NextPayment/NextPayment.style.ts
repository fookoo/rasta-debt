import styled from '@emotion/styled'
import { media } from '../../theme/theme'

export const NextPaymentLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.space.lg};

  ${media.md} {
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
  }
`
