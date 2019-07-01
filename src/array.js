export function isArr (o) {
  
  return Array.isArray(o)
}

export function toArr (o) {
  
  return isArr(o) ? o.slice() : [o]
}

export function arrAdd (existValid, o, item) {
  
  item = toArr(item)
  
  item = item.filter(existValid || (i => o.includes(i)))
  
  return o.concat(item)
}

export function arrRemove(existValid, o, item) {

  item = toArr(item)

  return o.filter(existValid || (i => !o.includes(i)))
}