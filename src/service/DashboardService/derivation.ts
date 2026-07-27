import type {
  DashboardData,
  Installment,
  InstallmentStatus,
  LoanInput,
} from './types'

const toLocalISODate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function computeDashboardData(input: LoanInput, now?: Date): DashboardData {
  const today = now ?? new Date()
  const todayISO = toLocalISODate(today)
  const currency = input.loan.principal.currency

  const totalPaid = input.payments.reduce((sum, p) => sum + p.amount.amount, 0)

  let remainingToDistribute = totalPaid

  const installments: Installment[] = input.installmentPlan.map((plan, index) => {
    const amount = plan.amount.amount
    const isFullyPaid = remainingToDistribute >= amount

    let status: InstallmentStatus
    if (isFullyPaid) {
      status = 'paid'
    } else if (plan.dueDate < todayISO) {
      status = 'overdue'
    } else {
      status = 'pending'
    }

    remainingToDistribute = isFullyPaid ? remainingToDistribute - amount : 0

    return {
      id: `inst-${index + 1}`,
      number: index + 1,
      dueDate: plan.dueDate,
      amount: plan.amount,
      status,
    }
  })

  const remaining = Math.max(0, input.loan.principal.amount - totalPaid)
  const nextUnpaid = installments.find((i) => i.status !== 'paid')

  return {
    debtor: input.debtor,
    loan: {
      id: input.loan.id,
      principal: input.loan.principal,
      paid: { amount: totalPaid, currency },
      remaining: { amount: remaining, currency },
      nextPaymentDate: nextUnpaid?.dueDate ?? null,
    },
    installments,
    payments: [...input.payments],
  }
}
