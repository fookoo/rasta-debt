import styled from '@emotion/styled'

type RootProps = {
  highlighted: boolean
}

export const InstallmentRowRoot = styled.li<RootProps>`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.lg};
  align-items: center;
  padding: ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid
    ${({ theme, highlighted }) => (highlighted ? theme.color.danger : theme.color.border)};
  background: ${({ theme, highlighted }) =>
    highlighted ? theme.color.dangerSoft : theme.color.bg};
`

export const InstallmentColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1 1 120px;
`

export const InstallmentBadgeCell = styled.div`
  margin-left: auto;
`
