import { curry } from 'lodash'
import { is } from './operator.is'
import { toArray } from './array.toArray'

function arrIncludes (
  valid?: ((oItem: any, item: any) => boolean),
  list?: any[],
  item?: any
) {
  valid = valid || is
  const items = toArray(item)
  return items.every((i: any) => list.some(o => valid(o, i)))
}


export const arrayIncludes = curry(arrIncludes)