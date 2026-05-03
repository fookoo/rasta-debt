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

const buildNextPayment = (data: DashboardData) => {
  if (!data.loan.nextPaymentDate) return null

  const upcoming = [...data.installments]
    .filter((i) => i.status !== 'paid')
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))[0]

  if (!upcoming) return null

  const daysUntil = daysBetween(new Date(), new Date(upcoming.dueDate))

  return {
    dateFormatted: formatDate(upcoming.dueDate),
    amountFormatted: formatMoney(upcoming.amount),
    daysUntil,
    isOverdue: upcoming.status === 'overdue',
  }
}

const buildInstallment = (installment: Installment) => ({
  id: installment.id,
  label: `Rata ${installment.number}`,
  dueDateFormatted: formatDate(installment.dueDate),
  amountFormatted: formatMoney(installment.amount),
  status: installment.status,
  statusLabel: STATUS_LABEL[installment.status],
})

const buildPayment = (payment: Payment) => ({
  id: payment.id,
  dateFormatted: formatDate(payment.date),
  amountFormatted: formatMoney(payment.amount),
  methodLabel: PAYMENT_METHOD_LABEL[payment.method],
  reference: payment.reference,
})

export type DashboardViewModel = {
  debtorName: string
  summary: ReturnType<typeof buildSummary>
  nextPayment: ReturnType<typeof buildNextPayment>
  installments: ReturnType<typeof buildInstallment>[]
  payments: ReturnType<typeof buildPayment>[]
}

const buildViewModel = (data: DashboardData): DashboardViewModel => ({
  debtorName: data.debtor.fullName,
  summary: buildSummary(data),
  nextPayment: buildNextPayment(data),
  installments: [...data.installments].sort((a, b) => a.number - b.number).map(buildInstallment),
  payments: [...data.payments].sort((a, b) => b.date.localeCompare(a.date)).map(buildPayment),
})

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
