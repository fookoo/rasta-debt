import { Card } from '../Card/Card'
import { Heading } from '../Heading/Heading'
import { PaymentRow } from '../PaymentRow/PaymentRow'
import { Stack } from '../Stack/Stack'
import { Text } from '../Text/Text'
import { EmptyPlaceholder, PaymentListRoot } from './PaymentList.style'

type Item = {
  id: string
  dateFormatted: string
  amountFormatted: string
  methodLabel: string
  reference: string
}

type Props = {
  items: Item[]
}

export const PaymentList = ({ items }: Props) => (
  <Card>
    <Stack gap="lg">
      <Heading level={2}>Historia wpłat</Heading>
      {items.length === 0 ? (
        <EmptyPlaceholder>
          <Text tone="muted">Brak wpłat do wyświetlenia</Text>
        </EmptyPlaceholder>
      ) : (
        <PaymentListRoot>
          {items.map((item) => (
            <PaymentRow
              key={item.id}
              dateFormatted={item.dateFormatted}
              amountFormatted={item.amountFormatted}
              methodLabel={item.methodLabel}
              reference={item.reference}
            />
          ))}
        </PaymentListRoot>
      )}
    </Stack>
  </Card>
)
