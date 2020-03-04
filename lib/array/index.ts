import { curry, not, is } from '../operator'

type ExistValidFunc<T = any> = undefined | ((oItem: T, item: T) => boolean)

export function toArray<T = any> (o: T | T[]) : T[] {
  return Array.isArray(o) ? o.slice() : Array.from(arguments)
}


function arrAdd<T = any> (
  existValid: ExistValidFunc<T>,
  o: T[],
  item: T
): T[] {

  const valid = existValid || not
  const items = toArray(item)
  .filter(function remainItem (item) {
    return o.every(function validate (oItem) {
      return valid(oItem, item)
    })
  })

  return o.concat(items)
}

function arrIncludes<T = any> (
  existValid: undefined | ((oItem: T, item: T) => boolean),
  o: T[],
  item: T
) {
  const valid = existValid || is
  const items = toArray(item)

  return items.every(function (item) {
    return o.some(function (oItem) {
      return valid(oItem, item)
    })
  })
}

function arrRemove<T = any> (
  existValid: undefined | ((o: T, item: T) => boolean),
  o: T[],
  item: T
) {
  const items = toArray(item)
  const valid = existValid || is

  return o.filter(function remain (oItem) {
    return !items.some(function (item) {
      return valid(oItem, item)
    })
  })
}

export const arrayRemove = curry<ExistValidFunc<any>, any[], any, any[]>(arrRemove)
export const arrayIncludes = curry<ExistValidFunc<any>, any[], any, boolean>(arrIncludes)
export const arrayAdd = curry<ExistValidFunc<any>, any[], any, any[]>(arrAdd)