import styled from '@emotion/styled'

export const ProgressTrack = styled.div`
  width: 100%;
  height: 10px;
  background: ${({ theme }) => theme.color.surfaceMuted};
  border-radius: ${({ theme }) => theme.radius.pill};
  overflow: hidden;
`

type FillProps = {
  percent: number
}

export const ProgressFill = styled.div<FillProps>`
  width: ${({ percent }) => `${percent}%`};
  height: 100%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.color.primary},
    ${({ theme }) => theme.color.primaryStrong}
  );
  transition: width 0.3s ease;
`
