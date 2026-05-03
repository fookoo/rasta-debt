export type Currency = 'PLN' | 'EUR' | 'USD'

export type Money = {
  amount: number
  currency: Currency
}

export type InstallmentStatus = 'paid' | 'pending' | 'overdue'

export type Installment = {
  id: string
  number: number
  dueDate: string
  amount: Money
  status: InstallmentStatus
}

export type Payment = {
  id: string
  date: string
  amount: Money
  method: 'transfer' | 'card' | 'cash'
  reference: string
}

export type DashboardData = {
  debtor: {
    id: string
    fullName: string
  }
  loan: {
    id: string
    principal: Money
    paid: Money
    remaining: Money
    nextPaymentDate: string | null
  }
  installments: Installment[]
  payments: Payment[]
}
