import { AddBillBody, BillInter } from '@/types/bills'
import { httpDelete, httpGet, httpPost } from '@/utils/http'

type billsApiRes = {
  list: BillInter[]
  currentPage: number
  pageSize: number
  total: number
  totalPage: number
}

export const getBillsApi = (params) => httpGet<billsApiRes>('bills', params)

export const addBillApi = (data: AddBillBody) => httpPost('bills', data)

export const deleteBillApi = (id: number) => httpDelete('bills', id)
