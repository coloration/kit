export function isArr (o: any) {
  return Array.isArray(o)
}

export function toArr (o: any) {
  return isArr(o) ? o.slice() : Array.from(arguments)
}

export function arrAdd (
  existValid: undefined | ((oItem: any, item: any) => boolean), 
  o: any[], 
  item: any
): any[] {
  
  const valid = existValid || function (oItem: any, item: any) { return oItem !== item }
  const items = toArr(item)
  .filter((item: any) => o.every(oitem => valid(oitem, item)))

  return o.concat(items)
}

export function arrRemove(
  existValid: undefined | ((o: any, item: any) => boolean), 
  o: any[], 
  item: any
) {

  const items = toArr(item)
  const valid = existValid || function (oItem: any, item: any) { return oItem === item }

  return o.filter((oItem: any) => !items.some((item: any) => valid(oItem, item)))
}