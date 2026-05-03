import styled from '@emotion/styled'

export const CardRoot = styled.section`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.space.lg};
  box-shadow: ${({ theme }) => theme.shadow.card};

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    padding: ${({ theme }) => theme.space.xl};
  }
`
