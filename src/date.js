export function nearNDayTime (n, offset) {

  offset = offset || 0
  const now = new Date().getTime()
  const near = now - offset * 86400000
  const far = now - n * 86400000
  return [far, near]
  
}

export function nearNDay (n, offset) {

  return nearNDayTime(n, offset).map(d => new Date(d))
  
}