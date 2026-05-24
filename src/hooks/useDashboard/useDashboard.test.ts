import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useDashboard } from './useDashboard'
import { DashboardService } from '../../service/DashboardService/DashboardService'
import type { DashboardData } from '../../service/DashboardService/types'

const sample: DashboardData = {
  debtor: { id: 'd1', fullName: 'Jan Testowy' },
  loan: {
    id: 'l1',
    principal: { amount: 10000, currency: 'PLN' },
    paid: { amount: 2500, currency: 'PLN' },
    remaining: { amount: 7500, currency: 'PLN' },
    nextPaymentDate: '2026-06-01',
  },
  installments: [
    {
      id: 'i1',
      number: 1,
      dueDate: '2026-04-01',
      amount: { amount: 2500, currency: 'PLN' },
      status: 'paid',
    },
    {
      id: 'i2',
      number: 2,
      dueDate: '2026-05-01',
      amount: { amount: 2500, currency: 'PLN' },
      status: 'overdue',
    },
    {
      id: 'i3',
      number: 3,
      dueDate: '2026-06-01',
      amount: { amount: 2500, currency: 'PLN' },
      status: 'pending',
    },
  ],
  payments: [
    {
      id: 'p1',
      date: '2026-04-01',
      amount: { amount: 2500, currency: 'PLN' },
      method: 'transfer',
      reference: 'INST-1',
    },
  ],
}

beforeEach(() => {
  vi.spyOn(DashboardService, 'getData').mockResolvedValue(structuredClone(sample))
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('useDashboard', () => {
  it('starts in loading state with no data', () => {
    const { result } = renderHook(() => useDashboard())
    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBeNull()
    expect(result.current.error).toBeNull()
  })

  it('exposes a formatted view-model after loading', async () => {
    const { result } = renderHook(() => useDashboard())
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.data?.debtorName).toBe('Jan Testowy')
    expect(result.current.data?.summary.progressPercent).toBe(25)
    expect(result.current.data?.summary.borrowedFormatted).toContain('10')
    expect(result.current.data?.installments).toHaveLength(3)
  })

  it('selects the earliest unpaid installment as the next payment', async () => {
    const { result } = renderHook(() => useDashboard())
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.data?.nextPayment?.isOverdue).toBe(true)
    expect(result.current.data?.nextPayment?.amountFormatted).toContain('2')
  })

  it('treats pending installments with a past due date as overdue', async () => {
    const overduePending: DashboardData = {
      ...sample,
      loan: {
        ...sample.loan,
        nextPaymentDate: '2000-01-01',
      },
      installments: [
        { ...sample.installments[0], id: 'paid', number: 1, dueDate: '1999-01-01' },
        {
          ...sample.installments[2],
          id: 'late',
          number: 2,
          dueDate: '2000-01-01',
          status: 'pending',
        },
        { ...sample.installments[2], id: 'future', number: 3, dueDate: '2999-01-01' },
      ],
    }
    vi.spyOn(DashboardService, 'getData').mockResolvedValue(overduePending)

    const { result } = renderHook(() => useDashboard())
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    const late = result.current.data?.installments.find((installment) => installment.id === 'late')

    expect(late?.status).toBe('overdue')
    expect(late?.statusLabel).toBe('Zaległa')
    expect(result.current.data?.nextPayment?.isOverdue).toBe(true)
  })

  it('shows overdue installments as a negative balance', async () => {
    const data: DashboardData = {
      ...sample,
      loan: {
        ...sample.loan,
        paid: { amount: 967, currency: 'PLN' },
      },
      installments: [
        {
          ...sample.installments[0],
          id: 'paid',
          number: 1,
          amount: { amount: 967, currency: 'PLN' },
        },
        {
          ...sample.installments[1],
          id: 'late-1',
          number: 2,
          dueDate: '2000-01-01',
          amount: { amount: 967, currency: 'PLN' },
        },
        {
          ...sample.installments[1],
          id: 'late-2',
          number: 3,
          dueDate: '2000-02-01',
          amount: { amount: 967, currency: 'PLN' },
        },
        {
          ...sample.installments[2],
          id: 'late-3',
          number: 4,
          dueDate: '2000-03-01',
          amount: { amount: 967, currency: 'PLN' },
          status: 'pending',
        },
        {
          ...sample.installments[2],
          id: 'late-4',
          number: 5,
          dueDate: '2000-04-01',
          amount: { amount: 967, currency: 'PLN' },
          status: 'pending',
        },
      ],
    }
    vi.spyOn(DashboardService, 'getData').mockResolvedValue(data)

    const { result } = renderHook(() => useDashboard())
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.data?.balance.amount).toBe(-3868)
    expect(result.current.data?.balance.tone).toBe('danger')
  })

  it('shows overpayment as a positive green balance without a plus sign', async () => {
    const data: DashboardData = {
      ...sample,
      loan: {
        ...sample.loan,
        paid: { amount: 2500, currency: 'PLN' },
      },
      installments: [
        {
          ...sample.installments[0],
          id: 'paid',
          number: 1,
          amount: { amount: 2000, currency: 'PLN' },
        },
        {
          ...sample.installments[2],
          id: 'future',
          number: 2,
          dueDate: '2999-01-01',
        },
      ],
    }
    vi.spyOn(DashboardService, 'getData').mockResolvedValue(data)

    const { result } = renderHook(() => useDashboard())
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.data?.balance.amount).toBe(500)
    expect(result.current.data?.balance.amountFormatted).not.toContain('+')
    expect(result.current.data?.balance.tone).toBe('success')
  })

  it('shows zero balance when there are no overdue installments or overpayment', async () => {
    const data: DashboardData = {
      ...sample,
      loan: {
        ...sample.loan,
        paid: { amount: 2000, currency: 'PLN' },
      },
      installments: [
        {
          ...sample.installments[0],
          id: 'paid',
          number: 1,
          amount: { amount: 2000, currency: 'PLN' },
        },
        {
          ...sample.installments[2],
          id: 'future',
          number: 2,
          dueDate: '2999-01-01',
        },
      ],
    }
    vi.spyOn(DashboardService, 'getData').mockResolvedValue(data)

    const { result } = renderHook(() => useDashboard())
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.data?.balance.amount).toBe(0)
    expect(result.current.data?.balance.tone).toBe('default')
  })

  it('sorts payments newest first and installments by number', async () => {
    const multi: DashboardData = {
      ...sample,
      payments: [
        { ...sample.payments[0], id: 'old', date: '2026-01-01' },
        { ...sample.payments[0], id: 'new', date: '2026-04-01' },
      ],
      installments: [...sample.installments].reverse(),
    }
    vi.spyOn(DashboardService, 'getData').mockResolvedValue(multi)

    const { result } = renderHook(() => useDashboard())
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.data?.payments[0].id).toBe('new')
    expect(result.current.data?.installments[0].label).toBe('Rata 1')
  })

  it('reports an error when the service fails', async () => {
    vi.spyOn(DashboardService, 'getData').mockRejectedValue(new Error('boom'))

    const { result } = renderHook(() => useDashboard())
    await waitFor(() => expect(result.current.error).not.toBeNull())

    expect(result.current.error?.message).toBe('boom')
    expect(result.current.data).toBeNull()
  })
})
