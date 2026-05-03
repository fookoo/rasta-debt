import { Text } from '../Text/Text'
import { PaymentAmountCell, PaymentColumn, PaymentRowRoot } from './PaymentRow.style'

type Props = {
  dateFormatted: string
  amountFormatted: string
  methodLabel: string
  reference: string
}

export const PaymentRow = ({ dateFormatted, amountFormatted, methodLabel, reference }: Props) => (
  <PaymentRowRoot>
    <PaymentColumn>
      <Text size="xs" tone="muted">
        Data
      </Text>
      <Text weight="medium">{dateFormatted}</Text>
    </PaymentColumn>
    <PaymentColumn>
      <Text size="xs" tone="muted">
        Metoda
      </Text>
      <Text>{methodLabel}</Text>
    </PaymentColumn>
    <PaymentColumn>
      <Text size="xs" tone="muted">
        Tytuł
      </Text>
      <Text>{reference}</Text>
    </PaymentColumn>
    <PaymentAmountCell>
      <Text size="lg" weight="bold" tone="success">
        {amountFormatted}
      </Text>
    </PaymentAmountCell>
  </PaymentRowRoot>
)
