import { BillInter } from '@/types/bills'
import { httpDelete, httpGet } from '@/utils/http'

type homeInfoApiRes = {
  monthPay: number
  monthIncome: number
  balance: number
}

export const getHomeInfo = () => httpGet<homeInfoApiRes>('home/info')
