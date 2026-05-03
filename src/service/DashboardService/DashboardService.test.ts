import { describe, it, expect } from 'vitest'
import { DashboardService } from './DashboardService'
import { mockDashboardData } from './mockData'

describe('DashboardService', () => {
  it('returns dashboard data shaped like the mock', async () => {
    const data = await DashboardService.getData()

    expect(data.debtor.fullName).toBe(mockDashboardData.debtor.fullName)
    expect(data.loan.principal.amount).toBe(mockDashboardData.loan.principal.amount)
    expect(data.installments).toHaveLength(mockDashboardData.installments.length)
    expect(data.payments).toHaveLength(mockDashboardData.payments.length)
  })

  it('returns a fresh copy that does not share references with the source mock', async () => {
    const data = await DashboardService.getData()

    expect(data).not.toBe(mockDashboardData)
    expect(data.installments).not.toBe(mockDashboardData.installments)
    expect(data.installments[0]).not.toBe(mockDashboardData.installments[0])
  })

  it('marks at least one installment as overdue in the seed data', async () => {
    const data = await DashboardService.getData()
    const overdue = data.installments.filter((i) => i.status === 'overdue')

    expect(overdue.length).toBeGreaterThan(0)
  })
})
