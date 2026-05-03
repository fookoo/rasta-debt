import { describe, it, expect } from 'vitest'
import { useNextPaymentLabel } from './useNextPaymentLabel'

describe('useNextPaymentLabel', () => {
  it('marks overdue as danger', () => {
    expect(useNextPaymentLabel({ daysUntil: -3, isOverdue: true })).toEqual({
      label: 'Zaległa od 3 dni',
      variant: 'danger',
    })
  })

  it('marks today as warning', () => {
    expect(useNextPaymentLabel({ daysUntil: 0, isOverdue: false })).toEqual({
      label: 'Dziś',
      variant: 'warning',
    })
  })

  it('marks within a week as warning', () => {
    expect(useNextPaymentLabel({ daysUntil: 5, isOverdue: false })).toEqual({
      label: 'Za 5 dni',
      variant: 'warning',
    })
  })

  it('marks further in the future as success', () => {
    expect(useNextPaymentLabel({ daysUntil: 14, isOverdue: false })).toEqual({
      label: 'Za 14 dni',
      variant: 'success',
    })
  })

  it('treats negative days as danger even when not flagged overdue', () => {
    expect(useNextPaymentLabel({ daysUntil: -1, isOverdue: false }).variant).toBe('danger')
  })
})
