import { useNextPaymentLabel } from '../../hooks/useNextPaymentLabel/useNextPaymentLabel'
import { Badge } from '../Badge/Badge'
import { Card } from '../Card/Card'
import { Heading } from '../Heading/Heading'
import { Stack } from '../Stack/Stack'
import { Text } from '../Text/Text'
import { NextPaymentLayout } from './NextPayment.style'

type Props = {
  dateFormatted: string
  amountFormatted: string
  daysUntil: number
  isOverdue: boolean
}

export const NextPayment = ({ dateFormatted, amountFormatted, daysUntil, isOverdue }: Props) => {
  const { label, variant } = useNextPaymentLabel({ daysUntil, isOverdue })

  return (
    <Card>
      <Stack gap="lg">
        <Heading level={2}>Najbliższa płatność</Heading>
        <NextPaymentLayout>
          <Stack gap="xs">
            <Text size="xs" tone="muted" weight="medium">
              Termin
            </Text>
            <Text size="lg" weight="bold">
              {dateFormatted}
            </Text>
          </Stack>
          <Stack gap="xs">
            <Text size="xs" tone="muted" weight="medium">
              Kwota
            </Text>
            <Text size="lg" weight="bold" tone="primary">
              {amountFormatted}
            </Text>
          </Stack>
          <Stack gap="xs">
            <Text size="xs" tone="muted" weight="medium">
              Status
            </Text>
            <Stack direction="row" gap="sm" align="center">
              <Badge variant={variant}>{label}</Badge>
            </Stack>
          </Stack>
        </NextPaymentLayout>
      </Stack>
    </Card>
  )
}
