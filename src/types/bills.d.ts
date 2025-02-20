export interface BillInter {
  id: number
  // 收入或支出
  type: 'income' | 'expense'
  // 金额
  amount: number
  // 备注
  note?: string
  // 日期
  date: string
  // 标签
  tag?: {
    name: string
    icon: string
  }
}
