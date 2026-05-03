import type { InstallmentStatus } from '../../service/DashboardService/types'
import type { BadgeVariant } from '../../components/Badge/Badge.style'

const VARIANT: Record<InstallmentStatus, BadgeVariant> = {
  paid: 'success',
  pending: 'neutral',
  overdue: 'danger',
}

export const useInstallmentRow = (status: InstallmentStatus) => ({
  badgeVariant: VARIANT[status],
  highlighted: status === 'overdue',
})
