export function formatDate(timestamp) {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // 月份是从0开始的
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 判断是不是同一天
export const isSameDay = (date1: number, date2: number) => {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}
