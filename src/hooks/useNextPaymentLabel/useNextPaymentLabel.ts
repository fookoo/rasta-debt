type Args = {
  daysUntil: number
  isOverdue: boolean
}

export type NextPaymentLabel = {
  label: string
  variant: 'success' | 'warning' | 'danger'
}

export const useNextPaymentLabel = ({ daysUntil, isOverdue }: Args): NextPaymentLabel => {
  if (isOverdue || daysUntil < 0) {
    return {
      label: `Zaległa od ${Math.abs(daysUntil)} dni`,
      variant: 'danger',
    }
  }

  if (daysUntil === 0) {
    return { label: 'Dziś', variant: 'warning' }
  }

  if (daysUntil <= 7) {
    return { label: `Za ${daysUntil} dni`, variant: 'warning' }
  }

  return { label: `Za ${daysUntil} dni`, variant: 'success' }
}
