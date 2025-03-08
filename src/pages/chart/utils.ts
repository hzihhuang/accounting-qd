import { formatTime } from '@/utils/fun'

export const getWeeks = () => {
  // 获取今年开始到现在所有周 [本周，上周，第x周,第x-1周]
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const yearStart = new Date(currentYear, 0, 1)

  // 计算当前是第几周
  const diffDays = Math.floor((currentDate.getTime() - yearStart.getTime()) / (1000 * 60 * 60 * 24))
  let currentWeek = Math.ceil((diffDays + yearStart.getDay() + 1) / 7)

  // 处理跨年周（当前周可能属于下一年）
  if (currentWeek > 52) {
    currentWeek = 1
  }

  // 生成周列表
  const weeks = []
  for (let i = currentWeek; i >= 1; i--) {
    const weekStart = new Date(yearStart)
    weekStart.setDate(yearStart.getDate() + (i - 1) * 7 - yearStart.getDay())
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)

    weeks.push({
      label: i === currentWeek ? '本周' : i === currentWeek - 1 ? '上周' : `第${i}周`,
      value: i,
      start: formatTime(weekStart.getTime(), 'YYYY-MM-DD'),
      end: formatTime(weekEnd.getTime(), 'YYYY-MM-DD'),
    })
  }

  return weeks
}

export const getMonths = () => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1

  const months = []
  for (let i = currentMonth; i >= 1; i--) {
    const monthStart = new Date(currentYear, i - 1, 1)
    const monthEnd = new Date(currentYear, i, 0)

    months.push({
      label: `${i}月`,
      value: i,
      start: formatTime(monthStart.getTime(), 'YYYY-MM-DD'),
      end: formatTime(monthEnd.getTime(), 'YYYY-MM-DD'),
    })
  }

  // 处理跨年情况
  if (currentMonth === 1) {
    months.push({
      label: '去年12月',
      value: 12,
      start: formatTime(new Date(currentYear - 1, 11, 1).getTime(), 'YYYY-MM-DD'),
      end: formatTime(new Date(currentYear - 1, 11, 31).getTime(), 'YYYY-MM-DD'),
    })
  }

  return months
}

export const getYears = () => {
  return []
}
