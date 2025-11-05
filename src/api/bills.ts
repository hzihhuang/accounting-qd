import { BillInter } from '@/types/bills'
import { httpDelete, httpGet } from '@/utils/http'

type billsApiRes = {
  list: BillInter[]
  currentPage: number
  pageSize: number
  total: number
  totalPage: number
}

export const getBillsApi = (params) => httpGet<billsApiRes>('bills', params)

export const deleteBillApi = (id: number) => httpDelete('bills', id)
