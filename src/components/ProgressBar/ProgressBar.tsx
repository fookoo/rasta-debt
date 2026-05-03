import { ProgressFill, ProgressTrack } from './ProgressBar.style'

type Props = {
  percent: number
}

export const ProgressBar = ({ percent }: Props) => (
  <ProgressTrack role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
    <ProgressFill percent={percent} />
  </ProgressTrack>
)
