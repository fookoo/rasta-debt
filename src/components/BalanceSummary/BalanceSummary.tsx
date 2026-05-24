import { Card } from '../Card/Card'
import { Stack } from '../Stack/Stack'
import { Text } from '../Text/Text'
import type { TextTone } from '../Text/Text.style'

type Props = {
  amountFormatted: string
  tone: TextTone
}

export const BalanceSummary = ({ amountFormatted, tone }: Props) => (
  <Card>
    <Stack gap="sm">
      <Text size="xs" tone="muted" weight="medium">
        SALDO
      </Text>
      <Text size="xxl" tone={tone} weight="bold">
        {amountFormatted}
      </Text>
      <Text size="sm" tone="muted">
        Względem harmonogramu
      </Text>
    </Stack>
  </Card>
)
