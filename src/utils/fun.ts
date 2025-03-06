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

// 格式化时间
export const formatTime = (timestamp: number, format: string = 'YYYY-MM-DD') => {
  const date = new Date(timestamp)
  const year = date.getFullYear().toString()
  const shortYear = year.slice(-2) // 新增两位年份
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')

  return format
    .replace(/YYYY/g, year)
    .replace(/YY/g, shortYear)
    .replace(/MM/g, month)
    .replace(/DD/g, day)
    .replace(/HH/g, hours) // 24小时制
    .replace(/hh/g, (date.getHours() % 12 || 12).toString().padStart(2, '0')) // 12小时制
    .replace(/mm/g, minutes)
    .replace(/ss/g, seconds)
}

// 时间对象
export const getDate = (time: string | number) => new Date(time)
