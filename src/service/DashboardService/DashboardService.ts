import { mockDashboardData } from './mockData'
import type { DashboardData } from './types'

const SIMULATED_DELAY_MS = 250

const clone = <T>(value: T): T =>
  typeof structuredClone === 'function' ? structuredClone(value) : JSON.parse(JSON.stringify(value))

export const DashboardService = {
  getData: (): Promise<DashboardData> =>
    new Promise((resolve) => {
      setTimeout(() => resolve(clone(mockDashboardData)), SIMULATED_DELAY_MS)
    }),
}

export type { DashboardData } from './types'
