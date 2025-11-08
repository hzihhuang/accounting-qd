import { httpGet } from '@/utils/http'

export const getChartWeeksApi = (params) => httpGet('charts/weeks', params)

export const getChartMonthsApi = (params) => httpGet('charts/months', params)

export const getChartYearsApi = (params) => httpGet('charts/years', params)

export const getChartLineDataApi = (params) =>
  httpGet<{ value: number; name: string }[]>('charts/line', params)

export const getChartCategoryDataApi = (params) =>
  httpGet<{ value: number; name: string }[]>('charts/category', params)

export const getChartBarDataApi = (params) =>
  httpGet<{ value: number; name: string }[]>('charts/bar', params)
