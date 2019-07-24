import { eq, neq } from './internal/_operator'
import { curry2, curry3 } from './internal/_curry'


export function isArr (o: any) {
  return Array.isArray(o)
}

export function toArr (o: any) {
  return isArr(o) ? o.slice() : Array.from(arguments)
}

function _arrIncludes (
  valid?: ((oItem: any, item: any) => boolean),
  list?: any[],
  item?: any
) {
  valid = valid || eq
  const items = toArr(item)
  return items.every((i: any) => list.some(o => valid(o, i)))
}




function _arrAdd (
  existValid: undefined | ((oItem: any, item: any) => boolean), 
  o: any[], 
  item: any
): any[] {
  
  const valid = existValid || neq
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

export const arrIncludes: typeof _arrIncludes = curry3(_arrIncludes)
export const arrAdd: typeof _arrAdd = curry3(_arrAdd)