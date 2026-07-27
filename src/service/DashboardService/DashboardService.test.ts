import { describe, it, expect } from 'vitest'
import { DashboardService } from './DashboardService'
import { mockLoanInput } from './mockData'

const PAYMENT_TOTAL = mockLoanInput.payments.reduce(
  (sum, p) => sum + p.amount.amount,
  0,
)
const INSTALLMENT_COUNT = mockLoanInput.installmentPlan.length

describe('DashboardService', () => {
  it('returns dashboard data derived from the loan input', async () => {
    const data = await DashboardService.getData()

    expect(data.debtor.fullName).toBe(mockLoanInput.debtor.fullName)
    expect(data.loan.principal.amount).toBe(mockLoanInput.loan.principal.amount)
    expect(data.loan.paid.amount).toBe(PAYMENT_TOTAL)
    expect(data.loan.remaining.amount).toBe(
      mockLoanInput.loan.principal.amount - PAYMENT_TOTAL,
    )
    expect(data.installments).toHaveLength(INSTALLMENT_COUNT)
    expect(data.payments).toHaveLength(mockLoanInput.payments.length)
  })

  it('computes installment statuses from payments', async () => {
    const data = await DashboardService.getData()

    const paidInstallments = data.installments.filter((i) => i.status === 'paid')
    const paidTotal = paidInstallments.reduce((s, i) => s + i.amount.amount, 0)

    expect(paidTotal).toBeLessThanOrEqual(PAYMENT_TOTAL)
    expect(paidInstallments.length).toBeGreaterThan(0)
  })

  it('sorts installments by number', async () => {
    const data = await DashboardService.getData()

    for (let i = 1; i < data.installments.length; i++) {
      expect(data.installments[i].number).toBe(data.installments[i - 1].number + 1)
    }
  })

  it('sets nextPaymentDate to the first unpaid installment', async () => {
    const data = await DashboardService.getData()

    const firstUnpaid = data.installments.find((i) => i.status !== 'paid')

    expect(data.loan.nextPaymentDate).toBe(firstUnpaid?.dueDate ?? null)
  })
})
