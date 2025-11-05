export interface BillInter {
  id: number
  // 金额
  price: number
  // 备注
  remark?: string
  // 日期
  date: string
  // 标签
  category?: {
    id: number
    name: string
    img: string
    type: 'income' | 'expense'
  }
}
