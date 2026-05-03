import { useInstallmentRow } from '../../hooks/useInstallmentRow/useInstallmentRow'
import type { InstallmentStatus } from '../../service/DashboardService/types'
import { Badge } from '../Badge/Badge'
import { Text } from '../Text/Text'
import { InstallmentBadgeCell, InstallmentColumn, InstallmentRowRoot } from './InstallmentRow.style'

type Props = {
  label: string
  dueDateFormatted: string
  amountFormatted: string
  status: InstallmentStatus
  statusLabel: string
}

export const InstallmentRow = ({
  label,
  dueDateFormatted,
  amountFormatted,
  status,
  statusLabel,
}: Props) => {
  const { badgeVariant, highlighted } = useInstallmentRow(status)

  return (
    <InstallmentRowRoot highlighted={highlighted}>
      <InstallmentColumn>
        <Text size="sm" tone="muted">
          {label}
        </Text>
        <Text weight="medium">{dueDateFormatted}</Text>
      </InstallmentColumn>
      <InstallmentColumn>
        <Text size="xs" tone="muted">
          Kwota
        </Text>
        <Text weight="bold">{amountFormatted}</Text>
      </InstallmentColumn>
      <InstallmentBadgeCell>
        <Badge variant={badgeVariant}>{statusLabel}</Badge>
      </InstallmentBadgeCell>
    </InstallmentRowRoot>
  )
}
