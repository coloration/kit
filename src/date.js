export const dateDayMicrosecond = 86400000

export function nearNDayTime (n, offsetToday = 0) {

  const now = new Date().getTime()
  const near = now - offsetToday * dateDayMicrosecond
  const far = now - n * dateDayMicrosecond
  return [far, near]
  
}

export function dateNearN (n, offset) {
  return nearNDayTime(n, offset).map(d => new Date(d))
}