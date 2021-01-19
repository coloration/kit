import { not, is, isPrimitive, isFunction, isEmptyArray, isNumber } from '../operator/index'

export type ExistValidFunc<T = any> = undefined | ((oItem: T, item: T) => boolean)

export function toArray<T = any> (o: T | T[], ..._args: any[]) : T[] {
  return Array.isArray(o) ? o.slice() : Array.from(arguments)
}


export function arrayAdd<T = any> (
  existValid: ExistValidFunc<T>,
  o: T[],
  item: T | T[]
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

export function arrayIncludes<T = any, K = T> (
  existValid: undefined | ((oItem: T, item: K) => boolean),
  o: T[],
  item: K | K[]
): boolean {
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
  item: T | T[]
): T[] {
  const items = toArray(item)
  const valid = existValid || is

  return o.filter(function remain (oItem) {
    return !items.some(function (item) {
      return valid(oItem, item)
    })
  })
}

/**
 * generate simple array with default value and length
 * @param length the length of generated array
 * @param value default value filled in array
 */
export function arrayRepeat<T = any> (
  length?: number, 
  value?: T | ((_: undefined, index: number, array: undefined[]) => T)
) : T[] {

  length = length || 0
  const g = (_: unknown, i: number) => value === undefined ? i : value
  return Array.from({ length }).map((isFunction(value) ? value : g) as any)
}

export function arrayPick<T = any> (field: string, array: any[]) : T[] {
  return array.map(item => isPrimitive(item) ? undefined : item[field])
}

export function arraySlice<T = any> (array: T[], start: number, end?: number) : T[] {
  if (!Array.isArray(array)) return array
  
  const leng = array.length

  if (leng === 0 || !isNumber(end) || !isNumber(start) || end < start) return array.slice(start, end)
  

  while(start < 0) {
    start += leng
    end += leng
  }

  while(start >= leng) {
    start -= leng
    end -= leng
  }

  let result = []
  
  do {
    result = result.concat(array.slice(start, end <= leng ? end : leng))
    start = 0
    end -= leng
  } while (end > 0) 

  return result
}