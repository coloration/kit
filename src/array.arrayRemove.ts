import { curry } from 'lodash'
import { toArray } from './array.toArray'

export function arrRemove(
  existValid: undefined | ((o: any, item: any) => boolean), 
  o: any[], 
  item: any
) {

  const items = toArray(item)
  const valid = existValid || function (oItem: any, item: any) { return oItem === item }

  return o.filter((oItem: any) => !items.some((item: any) => valid(oItem, item)))
}

export const arrayRemove = curry(arrRemove)