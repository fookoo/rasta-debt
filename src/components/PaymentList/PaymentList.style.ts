import styled from '@emotion/styled'

export const PaymentListRoot = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
`

export const EmptyPlaceholder = styled.div`
  padding: ${({ theme }) => theme.space.lg};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px dashed ${({ theme }) => theme.color.border};
  text-align: center;
`
