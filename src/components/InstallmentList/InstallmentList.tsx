import type { InstallmentStatus } from '../../service/DashboardService/types'
import { Card } from '../Card/Card'
import { Heading } from '../Heading/Heading'
import { InstallmentRow } from '../InstallmentRow/InstallmentRow'
import { Stack } from '../Stack/Stack'
import { InstallmentListRoot } from './InstallmentList.style'

type Item = {
  id: string
  label: string
  dueDateFormatted: string
  amountFormatted: string
  status: InstallmentStatus
  statusLabel: string
}

type Props = {
  items: Item[]
}

export const InstallmentList = ({ items }: Props) => (
  <Card>
    <Stack gap="lg">
      <Heading level={2}>Harmonogram rat</Heading>
      <InstallmentListRoot>
        {items.map((item) => (
          <InstallmentRow
            key={item.id}
            label={item.label}
            dueDateFormatted={item.dueDateFormatted}
            amountFormatted={item.amountFormatted}
            status={item.status}
            statusLabel={item.statusLabel}
          />
        ))}
      </InstallmentListRoot>
    </Stack>
  </Card>
)
