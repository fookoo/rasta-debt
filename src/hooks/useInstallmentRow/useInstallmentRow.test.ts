import { describe, it, expect } from 'vitest'
import { useInstallmentRow } from './useInstallmentRow'

describe('useInstallmentRow', () => {
  it('marks paid installments green and not highlighted', () => {
    expect(useInstallmentRow('paid')).toEqual({ badgeVariant: 'success', highlighted: false })
  })

  it('marks pending installments neutral', () => {
    expect(useInstallmentRow('pending')).toEqual({ badgeVariant: 'neutral', highlighted: false })
  })

  it('marks overdue installments as danger and highlighted', () => {
    expect(useInstallmentRow('overdue')).toEqual({ badgeVariant: 'danger', highlighted: true })
  })
})
