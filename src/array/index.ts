import { not, is } from '../operator'

export type ExistValidFunc<T = any> = undefined | ((oItem: T, item: T) => boolean)

export function toArray<T = any> (o: T | T[]) : T[] {
  return Array.isArray(o) ? o.slice() : Array.from(arguments)
}


export function arrayAdd<T = any> (
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

export function arrayIncludes<T = any> (
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

export function arrayRemove<T = any> (
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
