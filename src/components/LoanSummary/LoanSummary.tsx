import { Card } from '../Card/Card'
import { Heading } from '../Heading/Heading'
import { ProgressBar } from '../ProgressBar/ProgressBar'
import { Stack } from '../Stack/Stack'
import { StatGrid } from '../StatGrid/StatGrid'
import { StatTile } from '../StatTile/StatTile'
import { Text } from '../Text/Text'
import { ProgressLabels } from './LoanSummary.style'

type Props = {
  borrowed: string
  paid: string
  remaining: string
  balance: string
  balanceTone: 'default' | 'success' | 'danger'
  progressPercent: number
}

export const LoanSummary = ({
  borrowed,
  paid,
  remaining,
  balance,
  balanceTone,
  progressPercent,
}: Props) => (
  <Card>
    <Stack gap="lg">
      <Heading level={2}>Podsumowanie pożyczki</Heading>
      <StatGrid>
        <StatTile label="Łączna kwota pożyczona" value={borrowed} />
        <StatTile label="Kwota spłacona" value={paid} tone="success" />
        <StatTile label="Pozostało do spłaty" value={remaining} tone="primary" />
        <StatTile label="SALDO" value={balance} tone={balanceTone} />
      </StatGrid>
      <Stack gap="sm">
        <ProgressLabels>
          <Text size="sm" tone="muted">
            Postęp spłaty
          </Text>
          <Text size="sm" weight="medium">
            {progressPercent}%
          </Text>
        </ProgressLabels>
        <ProgressBar percent={progressPercent} />
      </Stack>
    </Stack>
  </Card>
)
