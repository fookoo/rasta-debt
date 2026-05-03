import styled from '@emotion/styled'

export const PaymentRowRoot = styled.li`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.lg};
  align-items: center;
  padding: ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.color.bg};
`

export const PaymentColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1 1 120px;
`

export const PaymentAmountCell = styled.div`
  margin-left: auto;
  text-align: right;
`
