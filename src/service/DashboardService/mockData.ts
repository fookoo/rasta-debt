import type { LoanInput } from './types'

const installmentAmount = { amount: 967, currency: 'PLN' as const }

const generateInstallmentPlan = (): LoanInput['installmentPlan'] => {
  const plan: LoanInput['installmentPlan'] = []
  for (let i = 0; i < 24; i++) {
    const year = 2025 + Math.floor((8 + i) / 12)
    const month = ((8 + i) % 12) + 1
    const day = 15
    plan.push({
      dueDate: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      amount: { ...installmentAmount },
    })
  }
  return plan
}

export const mockLoanInput: LoanInput = {
  debtor: {
    id: 'debtor-001',
    fullName: 'Łukasz Izdebski',
  },
  loan: {
    id: 'loan-2024-001',
    principal: { amount: 23502.22, currency: 'PLN' },
  },
  installmentPlan: generateInstallmentPlan(),
  payments: [
    {
      id: 'pay-1',
      date: '2025-09-23',
      amount: { amount: 967, currency: 'PLN' },
      method: 'transfer',
      reference: 'inst-1',
    },
    {
      id: 'pay-2',
      date: '2025-10-14',
      amount: { amount: 967, currency: 'PLN' },
      method: 'transfer',
      reference: 'inst-2',
    },
    {
      id: 'pay-3',
      date: '2025-10-20',
      amount: { amount: 967, currency: 'PLN' },
      method: 'transfer',
      reference: 'inst-3',
    },
    {
      id: 'pay-4',
      date: '2025-12-09',
      amount: { amount: 967, currency: 'PLN' },
      method: 'transfer',
      reference: 'inst-4',
    },
    {
      id: 'pay-5',
      date: '2025-12-09',
      amount: { amount: 272, currency: 'PLN' },
      method: 'transfer',
      reference: 'EXTRA',
    },
    {
      id: 'pay-6',
      date: '2026-04-26',
      amount: { amount: 967, currency: 'PLN' },
      method: 'transfer',
      reference: 'inst-5',
    },
    {
      id: 'pay-7',
      date: '2026-06-03',
      amount: { amount: 967, currency: 'PLN' },
      method: 'transfer',
      reference: 'inst-6',
    },
    {
      id: 'pay-8',
      date: '2026-06-03',
      amount: { amount: 967, currency: 'PLN' },
      method: 'transfer',
      reference: 'inst-7',
    },
    {
      id: 'pay-9',
      date: '2026-06-05',
      amount: { amount: 967, currency: 'PLN' },
      method: 'transfer',
      reference: 'inst-8',
    },
    {
      id: 'pay-10',
      date: '2026-06-18',
      amount: { amount: 967, currency: 'PLN' },
      method: 'transfer',
      reference: 'inst-9',
    },
    {
      id: 'pay-11',
      date: '2026-07-26',
      amount: { amount: 967, currency: 'PLN' },
      method: 'transfer',
      reference: 'inst-10',
    },
    {
      id: 'pay-12',
      date: '2026-07-26',
      amount: { amount: 967, currency: 'PLN' },
      method: 'transfer',
      reference: 'inst-11',
    },
  ],
}
