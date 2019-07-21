export function isArr (o: any) {
  return Array.isArray(o)
}

export function toArr (o: any) {
  return isArr(o) ? o.slice() : [o]
}

export function arrAdd (
  existValid: undefined | ((o: any, item: any) => boolean), 
  o: any, 
  item: any
): any[] {
  
  const valid = existValid || function (o: any, i: any) { return o.includes(i) }
  const items = toArr(item).filter((item: any) => valid(o, item))

  return o.concat(items)
}

export function arrRemove(
  existValid: undefined | ((o: any, item: any) => boolean), 
  o: any, 
  item: any
) {

  const items = toArr(item)
  const valid = existValid || function (_: any, i: any) { return !items.includes(i) }

  return o.filter((item: any) => valid(o, item))
}