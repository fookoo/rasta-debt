import { mockLoanInput } from './mockData'
import { computeDashboardData } from './derivation'
import type { DashboardData } from './types'

const SIMULATED_DELAY_MS = 250

export const DashboardService = {
  getData: (): Promise<DashboardData> =>
    new Promise((resolve) => {
      setTimeout(() => resolve(computeDashboardData(mockLoanInput)), SIMULATED_DELAY_MS)
    }),
}

export type { DashboardData } from './types'
