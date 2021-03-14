import moment from 'moment'

export function GMTToStr(time) {
  let date = new Date(time)
  let str =
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1) +
    '-' +
    date.getDate() +
    ' ' +
    date.getHours() +
    ':' +
    date.getMinutes() +
    ':' +
    date.getSeconds()
  return str
}

/**
 * 获取当前时间
 * @returns {moment.Moment}
 */
export const getNowDate = () => {
  return moment(new Date(), 'YYYY-MM-DD')
}

/**
 * 当前时间之后的几天
 * @param number
 * @returns {moment.Moment}
 */
export const getAfterDayDate = number => {
  const curTime = new Date().getTime()
  const date2 = curTime + number * 3600 * 24 * 1000
  const nDate = new Date(date2)
  return moment(nDate).format('YYYY-MM-DD') + '  00:00:00'
}

/**
 * 当前时间之后的几个月
 * @returns {moment.Moment}
 */
export const getAfterMonthDate = number => {
  const date = new Date()
  let time = date.getTime()
  time += number * 30 * 86400000
  const nDate = new Date(time)
  return moment(nDate.toLocaleDateString())
}
