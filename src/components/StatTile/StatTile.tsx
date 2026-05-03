import type { TextTone } from '../Text/Text.style'
import { Text } from '../Text/Text'
import { StatTileRoot } from './StatTile.style'

type Props = {
  label: string
  value: string
  tone?: TextTone
}

export const StatTile = ({ label, value, tone = 'default' }: Props) => (
  <StatTileRoot>
    <Text size="xs" tone="muted" weight="medium">
      {label}
    </Text>
    <Text size="xl" tone={tone} weight="bold">
      {value}
    </Text>
  </StatTileRoot>
)
