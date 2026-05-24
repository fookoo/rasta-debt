import { useEffect, useMemo, useState } from 'react'
import { DashboardService } from '../../service/DashboardService/DashboardService'
import type {
  DashboardData,
  Installment,
  InstallmentStatus,
  Money,
  Payment,
} from '../../service/DashboardService/types'

const LOCALE = 'pl-PL'

const formatMoney = (money: Money): string =>
  new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: money.currency,
    maximumFractionDigits: 0,
  }).format(money.amount)

const formatDate = (iso: string): string =>
  new Intl.DateTimeFormat(LOCALE, { day: '2-digit', month: 'long', year: 'numeric' }).format(
    new Date(iso),
  )

const formatSignedMoney = (money: Money): string =>
  new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: money.currency,
    maximumFractionDigits: 0,
    signDisplay: 'exceptZero',
  }).format(money.amount)

const toLocalISODate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const STATUS_LABEL: Record<InstallmentStatus, string> = {
  paid: 'Opłacona',
  pending: 'Oczekuje',
  overdue: 'Zaległa',
}

const PAYMENT_METHOD_LABEL: Record<Payment['method'], string> = {
  transfer: 'Przelew',
  card: 'Karta',
  cash: 'Gotówka',
}

const daysBetween = (from: Date, to: Date): number => {
  const ms = to.getTime() - from.getTime()
  return Math.round(ms / (1000 * 60 * 60 * 24))
}

const resolveInstallmentStatus = (
  installment: Installment,
  todayISO: string,
): InstallmentStatus => {
  if (installment.status === 'pending' && installment.dueDate < todayISO) {
    return 'overdue'
  }

  return installment.status
}

const buildSummary = (data: DashboardData) => {
  const principal = data.loan.principal.amount
  const paid = data.loan.paid.amount
  const progressPercent = principal === 0 ? 0 : Math.min(100, Math.round((paid / principal) * 100))

  return {
    borrowedFormatted: formatMoney(data.loan.principal),
    paidFormatted: formatMoney(data.loan.paid),
    remainingFormatted: formatMoney(data.loan.remaining),
    progressPercent,
  }
}

type BalanceTone = 'default' | 'success' | 'danger'

const getBalanceTone = (amount: number): BalanceTone => {
  if (amount > 0) return 'danger'
  if (amount < 0) return 'success'

  return 'default'
}

const buildBalance = (data: DashboardData, todayISO: string) => {
  const scheduledAmount = data.installments
    .filter((installment) => installment.dueDate < todayISO)
    .reduce((total, installment) => total + installment.amount.amount, 0)
  const amount = scheduledAmount - data.loan.paid.amount

  return {
    amount,
    amountFormatted: formatSignedMoney({
      amount,
      currency: data.loan.paid.currency,
    }),
    tone: getBalanceTone(amount),
  }
}

const buildNextPayment = (data: DashboardData, todayISO: string, now: Date) => {
  if (!data.loan.nextPaymentDate) return null

  const upcoming = [...data.installments]
    .filter((i) => i.status !== 'paid')
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))[0]

  if (!upcoming) return null

  const status = resolveInstallmentStatus(upcoming, todayISO)
  const daysUntil = daysBetween(now, new Date(upcoming.dueDate))

  return {
    dateFormatted: formatDate(upcoming.dueDate),
    amountFormatted: formatMoney(upcoming.amount),
    daysUntil,
    isOverdue: status === 'overdue',
  }
}

const buildInstallment = (installment: Installment, todayISO: string) => {
  const status = resolveInstallmentStatus(installment, todayISO)

  return {
    id: installment.id,
    label: `Rata ${installment.number}`,
    dueDateFormatted: formatDate(installment.dueDate),
    amountFormatted: formatMoney(installment.amount),
    status,
    statusLabel: STATUS_LABEL[status],
  }
}

const buildPayment = (payment: Payment) => ({
  id: payment.id,
  dateFormatted: formatDate(payment.date),
  amountFormatted: formatMoney(payment.amount),
  methodLabel: PAYMENT_METHOD_LABEL[payment.method],
  reference: payment.reference,
})

export type DashboardViewModel = {
  debtorName: string
  balance: ReturnType<typeof buildBalance>
  summary: ReturnType<typeof buildSummary>
  nextPayment: ReturnType<typeof buildNextPayment>
  installments: ReturnType<typeof buildInstallment>[]
  payments: ReturnType<typeof buildPayment>[]
}

const buildViewModel = (data: DashboardData): DashboardViewModel => {
  const now = new Date()
  const todayISO = toLocalISODate(now)

  return {
    debtorName: data.debtor.fullName,
    balance: buildBalance(data, todayISO),
    summary: buildSummary(data),
    nextPayment: buildNextPayment(data, todayISO, now),
    installments: [...data.installments]
      .sort((a, b) => a.number - b.number)
      .map((installment) => buildInstallment(installment, todayISO)),
    payments: [...data.payments].sort((a, b) => b.date.localeCompare(a.date)).map(buildPayment),
  }
}

type State =
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'ready'; data: DashboardData }

export type UseDashboardResult = {
  isLoading: boolean
  error: Error | null
  data: DashboardViewModel | null
}

export const useDashboard = (): UseDashboardResult => {
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    DashboardService.getData()
      .then((data) => {
        if (!cancelled) setState({ status: 'ready', data })
      })
      .catch((error: unknown) => {
        if (!cancelled)
          setState({
            status: 'error',
            error: error instanceof Error ? error : new Error('Nieznany błąd'),
          })
      })
    return () => {
      cancelled = true
    }
  }, [])

  const data = useMemo(
    () => (state.status === 'ready' ? buildViewModel(state.data) : null),
    [state],
  )

  return {
    isLoading: state.status === 'loading',
    error: state.status === 'error' ? state.error : null,
    data,
  }
}
