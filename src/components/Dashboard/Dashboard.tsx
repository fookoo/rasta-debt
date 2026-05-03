import { useDashboard } from '../../hooks/useDashboard/useDashboard'
import { Card } from '../Card/Card'
import { DebtorHeader } from '../DebtorHeader/DebtorHeader'
import { InstallmentList } from '../InstallmentList/InstallmentList'
import { LoanSummary } from '../LoanSummary/LoanSummary'
import { NextPayment } from '../NextPayment/NextPayment'
import { Page } from '../Page/Page'
import { PaymentList } from '../PaymentList/PaymentList'
import { Stack } from '../Stack/Stack'
import { Text } from '../Text/Text'
import { StateMessage } from './Dashboard.style'

export const Dashboard = () => {
  const { isLoading, error, data } = useDashboard()

  if (isLoading) {
    return (
      <Page>
        <Card>
          <StateMessage>
            <Text tone="muted">Ładowanie danych…</Text>
          </StateMessage>
        </Card>
      </Page>
    )
  }

  if (error || !data) {
    return (
      <Page>
        <Card>
          <StateMessage>
            <Text tone="danger" weight="medium">
              Nie udało się wczytać danych: {error?.message ?? 'brak danych'}
            </Text>
          </StateMessage>
        </Card>
      </Page>
    )
  }

  return (
    <Page>
      <Stack gap="xl">
        <DebtorHeader name={data.debtorName} />
        <LoanSummary
          borrowed={data.summary.borrowedFormatted}
          paid={data.summary.paidFormatted}
          remaining={data.summary.remainingFormatted}
          progressPercent={data.summary.progressPercent}
        />
        {data.nextPayment && (
          <NextPayment
            dateFormatted={data.nextPayment.dateFormatted}
            amountFormatted={data.nextPayment.amountFormatted}
            daysUntil={data.nextPayment.daysUntil}
            isOverdue={data.nextPayment.isOverdue}
          />
        )}
        <InstallmentList items={data.installments} />
        <PaymentList items={data.payments} />
      </Stack>
    </Page>
  )
}
