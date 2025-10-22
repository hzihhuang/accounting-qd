export interface BillInter {
  id: number
  // 收入或支出
  type: 'income' | 'expense'
  // 金额
  price: number
  // 备注
  note?: string
  // 日期
  date: string
  // 标签
  tag?: {
    id: number
    name: string
    icon: string
  }
}
